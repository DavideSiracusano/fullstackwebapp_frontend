import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userSub } from '../models/userSub';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:4000';
  logged: boolean = true;

  constructor(private router: Router, private http: HttpClient) {}

  registerUser(user: userSub) {
    return this.http.post<any>(`${this.apiURL}/register`, user);
  }

  loginUser(username: string, password: string) {
    return this.http.post<any>(`${this.apiURL}/login`, { username, password });
  }

  logout() {
    this.logged = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
