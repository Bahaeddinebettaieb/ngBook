import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from '@angular/router';

import { CONFIG } from './../config/config';
import { User } from '../classes/user';
import { UserData } from '../classes/UserData';

@Injectable () 
export class AuthService {
    constructor(private http :Http, private router: Router ) {}
    register(name : String , email: String, password: String): Promise<UserData> {
        return this.http.post(`${CONFIG.API_URL}/register`, {
            name: name, email:email, password:password
        }).toPromise().then((Response) => {
            let token = Response.json().token
            let user = Response.json().user.data
            let userData = new UserData(token,user)
            return userData
         })

    }
    Login(userData : UserData) : void {
        localStorage.setItem('token', userData.token)
        localStorage.setItem('user', JSON.stringify(userData.user))
        this.router.navigate(['/dashboard'])
    }
}