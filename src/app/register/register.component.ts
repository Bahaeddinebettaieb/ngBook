import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserData } from '../classes/UserData';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthService, private notifyService: NotifyService) { }

  ngOnInit() {
  }
  onSubmit(form){
    this.authService.register(form.value.name, form.value.email, form.value.password ).then((userData) => {
      this.authService.LogUserData(userData)
    })
    .catch(e => {
      console.log(e)
      this.notifyService.notify(e.error,'error')
    })
  }
}
