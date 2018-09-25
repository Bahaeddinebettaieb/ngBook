import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

import { AuthService } from '../services/auth.service';
import { JokeService } from '../services/jokes.service';


@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {
  @Input() joke
  editing: boolean = false
  title = new FormControl()
  content = new FormControl()
  constructor(private authService: AuthService, private jokeService: JokeService) { }

  ngOnInit() {
    this.title = new FormControl(this.joke.title, Validators.required)
    this.content = new FormControl(this.joke.joke, Validators.required)
  }

  canModify():boolean {
    return this.joke.user.id == this.authService.getAuthUserId()
  }
  edit(){
    this.editing = true
  }
  updateJoke(){
    this.jokeService.updateJoke(+this.joke.id, {
      title: this.title.value,
      content: this.content.value
    }).then(Response => {
      console.log('update')
      console.log(Response)
    })
  }

}
