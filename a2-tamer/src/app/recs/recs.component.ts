import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service'

@Component({
  selector: 'app-recs',
  templateUrl: './recs.component.html',
  styleUrls: ['./recs.component.css']
})
export class RecsComponent implements OnInit {
  recs: Array<User> = [];
  showedUser: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.recs().subscribe(
      (users) => {
        this.recs = users;
        this.next();
      }
    )
  }

  onClickPass() {
    this.userService.dislike(this.showedUser._id).subscribe(
      (user) => {
        this.next();
      }
    )
  }

  onClickFriend() {
    this.userService.like(this.showedUser._id).subscribe(
      (user) => {
        this.next();
      }
    )
  }

  next() {
    this.showedUser = this.recs.pop();
  }

}
