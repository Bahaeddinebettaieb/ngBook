import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { JokeService } from '../services/jokes.service';
import { NotifyService } from '../services/notify.service';


@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {
  @Input() joke
  @Output() jokeDeleted = new EventEmitter()
  editing: boolean = false
  title = new FormControl()
  content = new FormControl()
  constructor(private authService: AuthService, private jokeService: JokeService, private notifyService: NotifyService) { }

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
      this.joke = Response
      this.editing = false
      this.notifyService.notify('Joke Update', 'success')
    })
  }

  deleteJoke(){
    this.jokeService.deleteJoke(+this.joke.id)
      .then(Response => {
        console.log(Response)
        this.jokeDeleted.emit(this.joke.id)
      })
  }

  cancel(){
    this.title.reset()
    this.content.reset()
    this.editing = false
  }

}
