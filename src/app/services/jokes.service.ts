import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgProgress } from "@ngx-progressbar/core";


import { AuthService } from "./auth.service";
import { CONFIG } from './../config/config';


@Injectable()
export class JokeService{
    private headers : Headers
    constructor (private  authService : AuthService , private http: Http, private bar: NgProgress) {
        this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`})
    }
    
    createJoke(joke): Promise<any>{
        let url = `${CONFIG.API_URL}/jokes`
        this.bar.start()
        let body = {title: joke.title, joke: joke.content}
        let options = new RequestOptions ({headers: this.headers})
        return this.http.post(url,body,options)
            .toPromise()
            .then(Response => {
                this.bar.complete()
                return Response.json()
            })
    }

    updateJoke(id: number, joke){
        let url = `${CONFIG.API_URL}/jokes/${id}`
        this.bar.start()
        let body = {title: joke.title, joke: joke.content}
        let options = new RequestOptions ({headers: this.headers})
        return this.http.put(url,body,options)
            .toPromise()
            .then(Response => {
                this.bar.complete()
                return Response.json()
            })
    }

    getAllJokes(endPoint = null){
        let url
        if (endPoint) {
            url = endPoint
        }else{
            url = `${CONFIG.API_URL}/jokes`
        }
        this.bar.start()
        let options = new RequestOptions ({headers: this.headers})
        return this.http.get(url,options)
            .toPromise()
            .then(Response => {
                this.bar.complete()
                return Response.json()
            })
    }
}