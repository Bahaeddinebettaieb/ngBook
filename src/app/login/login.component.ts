import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service'; 
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice : AuthService, private notifyService: NotifyService) { }

  ngOnInit() {
  }
  onSubmit(form){
    this.authservice.login(form.value.email, form.value.password)
    .then ((userData) => {
      this.authservice.LogUserData(userData)
    })
    .catch(e => {
      console.log(e)
      this.notifyService.notify(e.error,'error')
    })
  }

}
