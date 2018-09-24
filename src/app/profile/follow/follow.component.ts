import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, OnChanges {
  @Input() currentProfileId
  public isFollowing : boolean
  private isLoading : boolean = true
  constructor(private followService: FollowService) { }

  ngOnChanges(changes){
     this.checkIfFollowing()
   console.log(changes)
  }

  ngOnInit() {
    this.checkIfFollowing()
  }
  
  checkIfFollowing(){
    this.followService.isFollowing(this.currentProfileId)
      .then((Response) => {
        this.isLoading = false
        this.isFollowing = Response
        console.log(Response)
      })
  }

  unfollow(){
    this.isLoading = true
    this.followService.unfollow(this.currentProfileId)
              .then((Response) => {
                console.log(Response)
                this.isFollowing = false
                this.isLoading = false
              })
  }

  follow(){
    this.isLoading = true
    this.followService.follow(this.currentProfileId)
              .then((Response) => {
                console.log(Response)
                this.isFollowing = true
                this.isLoading = false
              })
  }

}
