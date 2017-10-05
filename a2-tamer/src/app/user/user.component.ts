import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

    onClickFriend() {}


}
