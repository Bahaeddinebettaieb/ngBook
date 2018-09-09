import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice : AuthService) { }

  ngOnInit() {
  }
  onSubmit(form){
    this.authservice.login(form.value.email, form.value.password)
    .then ((userData) => {
      this.authservice.LogUserData(userData)
    })
  }

}
