import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from '../shared/services/message.service';
import { Message } from '../shared/models/message.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message: Message;
  error: string;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.messageService.getMessage().subscribe(
      (message => this.message = message),
      (error => this.error = error)
    );
  }

  logout() {
    this.authService.logout().subscribe(
      (ok) => { this.router.navigate(['login']); },
      (error) => { this.error = error; },
    );
  }

}
