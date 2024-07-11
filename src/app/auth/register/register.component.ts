import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { userSub } from '../../models/userSub';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  subscribeForm!: FormGroup;

  user: userSub = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscribeForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      this.user = {
        username: this.subscribeForm.get('username')?.value,
        password: this.subscribeForm.get('password')?.value,
      };

      let authData = {
        dateMill: new Date().getTime() + 60 * 60 * 1000, // user login expires after an hour
      };

      // Chiamata a registerUser() del servizio AuthService con il Bearer token
      this.authService.registerUser(this.user).subscribe(
        (newUser) => {
          console.log('Nuovo utente registrato:', newUser);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          localStorage.setItem('authData', JSON.stringify(authData));
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error("Errore durante la registrazione dell'utente:", error);
          if (error.status === 422) {
            console.log('Dettagli degli errori di validazione:', error.error);
            // Puoi gestire gli errori di validazione qui, ad esempio visualizzando un messaggio all'utente
          }
        }
      );
    }
  }
}
