import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id : number
  user : User
  constructor(private router : ActivatedRoute, private bar: NgProgress ,private userService : UserService, private authService: AuthService) { 
    this.userService.userProfileUpdate.subscribe((user) => {this.user = user})
  }

  isAuthUserProfile () : boolean {
    return this.id === +this.authService.getAuthUserId()
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.bar.start()
      this.id = +params['id']
      this.userService.getUserById(this.id)
        .then((user) => {
          this.user = user
          this.bar.complete()
        })
    })
  }

}
