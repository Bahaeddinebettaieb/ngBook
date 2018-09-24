import { Component, OnInit, Input } from '@angular/core';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  @Input() currentProfileId
  public isFollowing
  private isLoading : boolean = true
  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.followService.isFollowing(this.currentProfileId)
      .then((Response) => {
        this.isLoading = false
        this.isFollowing = Response
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
