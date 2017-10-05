import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitRegister(registerForm): void {
    this.authService.register(this.user).subscribe(
      (user) => {
        this.router.navigate(['/user']);
      },
      (error) => { this.error = error; }
    );
  }
}
