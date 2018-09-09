import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthedGuard implements CanActivate {
    constructor (private authservive :AuthService, private route : Router) {}

    canActivate() {
        if (!this.authservive.IsLoggedIn()) return true
        this.route.navigate(['/dashboard'])
        return false

    }

} 