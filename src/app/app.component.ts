import { Component } from '@angular/core';

import  { AuthService } from './services/auth.service';
import { User } from './classes/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user : User
  constructor (private authservice : AuthService) {
    this.user = this.authservice.getAuthUser()
  }

  isLoggedIn ():boolean  {
    return this.authservice.IsLoggedIn()
  }
  logout(){
    this.authservice.logout()
  }
}
