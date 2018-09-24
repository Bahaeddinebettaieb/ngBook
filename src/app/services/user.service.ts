import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";


import { AuthService } from "./auth.service";
import { CONFIG } from './../config/config';
import { User } from "../classes/user";
import { promise } from "protractor";

@Injectable()
export class UserService {
    public userProfileUpdate : EventEmitter<User>
    private headers : Headers
    constructor (private  authService : AuthService , private http: Http) {
        this.userProfileUpdate = new EventEmitter ()
        this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`})
    }

    getUserWall(id: number){
        let options = new RequestOptions({headers : this.headers})
        return this.http.get(`${CONFIG.API_URL}/user/profile/${id}/wall`,options).toPromise().then(
            (Response) =>  {return Response.json()
        })

    }
    
    getUserById (id : number) : Promise <User> {
        if (id == this.authService.getAuthUserId()){
            console.log (this.authService.getAuthUser())
            return Promise.resolve(this.authService.getAuthUser())
        }
        let options = new RequestOptions({headers : this.headers})
        return this.http.get(`${CONFIG.API_URL}/user/${id}`,options).toPromise().then(
            (Response) =>  {return Response.json()
        })
    }

    updateProfile(name: String, email: String) : Promise <User> {
        let url = `${CONFIG.API_URL}/user/update`
        let body = {name :name, email :email }
        let options = new RequestOptions({headers : this.headers})
        return this.http.put(url, body, options)
            .toPromise()
            .then((Response) => {
                let user = Response.json().data
                localStorage.setItem('user', JSON.stringify(user))
                this.userProfileUpdate.emit(user)
                return user 
            })
    }

}