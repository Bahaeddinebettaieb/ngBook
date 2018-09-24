import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions} from '@angular/http';
import { NotifyService } from "./notify.service";
import { CONFIG } from "../config/config";
import { AuthService } from "./auth.service";
import { NgProgress } from "@ngx-progressbar/core";

@Injectable()
export class FollowService {
    private headers: Headers
    constructor (private http :Http, private noty: NotifyService, private authService: AuthService, private bar: NgProgress ) {
        this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`})
    }

    unfollow(id : number) {
        this.bar.start()
        let url = `${CONFIG.API_URL}/user/unfollow`
        let body = {user_to_unfollow_id: id}
        let options = new RequestOptions ({headers: this.headers})
        return this.http.post(url,body,options)
            .toPromise()
            .then(Response => {
                this.bar.complete()
                return Response.json()
            })
    }

    follow(id: number) {
        this.bar.start()
        let url = `${CONFIG.API_URL}/user/follow`
        let body = { user_to_follow_id: id}
        let options = new RequestOptions({headers: this.headers})
        return this.http.post(url,body,options)
            .toPromise()
            .then(Response => {
                this.bar.complete()
                return Response.json()
            })
    }

    isFollowing(id: number) : Promise<boolean> {
        let url = `${CONFIG.API_URL}/user/is/following`
        let body = {user_to_check_if_is_following_id:id}
        let options = new RequestOptions({headers: this.headers})
        return this.http.post(url, body, options)
            .toPromise()
            .then(Response => {
                return Response.json().following
            })
    }

}