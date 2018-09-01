import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { CONFIG } from './../config/config';

@Injectable () 
export class AuthService {
    constructor(private http :Http ) {}
    register(name : String , email: String, password: String) {
        return this.http.post(`${CONFIG.API_URL}/register`, {name: name, email:email, password:password}).toPromise().
        then((Response) =>{
            console.log(Response);
        })

    }
}