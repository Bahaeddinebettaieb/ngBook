import { Component, OnInit } from '@angular/core';
import { JokeService } from '../services/jokes.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data
  constructor(private jokeService: JokeService, private bar: NgProgress) { }

  ngOnInit() {
    this.getJokes()
  }

  getPrevJokes(){
    this.getJokes(this.data.prev_page_url)
  }

  getNextJokes(){
    this.getJokes(this.data.next_page_url)
  }

  getJokes(endPoint = null){
    this.jokeService.getAllJokes(endPoint)
      .then(Response  => {
        console.log(Response)
        this.data = Response
      })
  }

}
