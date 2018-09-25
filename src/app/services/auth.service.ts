import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from '@angular/router';

import { CONFIG } from './../config/config';
import { User } from '../classes/user';
import { UserData } from '../classes/UserData';
import { NotifyService } from './notify.service';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable () 
export class AuthService {
    constructor(private http :Http, private router: Router, private notifyService : NotifyService, private bar : NgProgress ) {}

    register(name : String , email: String, password: String): Promise<UserData> {
        this.bar.start()
        return this.http.post(`${CONFIG.API_URL}/register`, {
            name: name, email:email, password:password
        }).toPromise().then((Response) => {
            let token = Response.json().token
            let user = Response.json().user.data
            let userData = new UserData(token,user)
            return userData
         })
         .catch(e => {
            this.bar.complete()
            return Promise.reject(e.json())
        })
    }

    getAuthUser() : User {
        return JSON.parse(localStorage.getItem('user'))
    }

    getAuthUserId() : number {
        return JSON.parse(localStorage.getItem('user')).id
    }

    LogUserData(userData : UserData) : void {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('user', JSON.stringify(userData.user))
        this.notifyService.notify('sucessfully logged in', 'success')
        this.router.navigate(['/dashboard'])
        
    }

    getToken() : string {
        return localStorage.getItem('token')
    }

    login(email: String , password : String): Promise<any> {
        this.bar.start()
        return this.http.post(`${CONFIG.API_URL}/authenticate`, {email:email, password:password
        }).toPromise().then((Response) => {
            let token = Response.json().token
            let user = Response.json().user.data
            let userData = new UserData(token,user)
            return userData
        })
        .catch(e => {
            this.bar.complete()
            return Promise.reject(e.json())
        })
    }

    logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.router.navigate(['/auth/login'])
    }

    IsLoggedIn() : boolean {
        let token = localStorage.getItem('token')
        let user = localStorage.getItem('user')
        if (user && token) return true
        return false
    }
}