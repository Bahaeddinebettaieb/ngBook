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
  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.followService.isFollowing(this.currentProfileId)
      .then((Response) => {
        this.isFollowing = Response
      })
  }

  follow(){
    this.followService.follow(this.currentProfileId)
              .then((Response) => {
                console.log(Response)
                this.isFollowing = true
              })
  }

}
