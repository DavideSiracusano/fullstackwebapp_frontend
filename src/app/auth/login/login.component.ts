import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { userSub } from '../../models/userSub';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      let authData = {
        dateMill: new Date().getTime() + 60 * 60 * 1000, // user login expires after an hour
      };

      const { username, password } = this.loginForm.value;

      this.authService.loginUser(username, password).subscribe(
        (loggedUser) => {
          console.log('Utente loggato:', loggedUser);
          localStorage.setItem('currentUser', JSON.stringify(loggedUser));
          localStorage.setItem('authData', JSON.stringify(authData));
          this.router.navigate(['/home']);
        },
        (error) => {
          this.loginError = true;
        }
      );
    }
  }
}
