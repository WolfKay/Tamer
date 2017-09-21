import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

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
        registerForm.reset();
        this.router.navigate(['/messages']);
      },
      (error) => { this.error = error; }
    );
  }
}
