import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JokeService } from '../services/jokes.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css']
})
export class CreateJokeComponent implements OnInit {
  public jokeForm: FormGroup
  constructor(private fb: FormBuilder, private jokeService: JokeService, private router: Router, private authService: AuthService) {
    this.createFrom()
   }

   createFrom(){
     this.jokeForm = this.fb.group({
       title: ['', [
         Validators.required
       ]],
       content: ['', [
         Validators.required,
         Validators.minLength(5) 
       ]]
     })
   }

  ngOnInit() {
  }
   
  onSubmit(){
    console.log(this.jokeForm)
    console.log(this.jokeForm.value)
    this.jokeService.createJoke(this.jokeForm.value)
      .then(Response => {
        this.router.navigate(['user/profile',this.authService.getAuthUserId()])
      })
  }
}
