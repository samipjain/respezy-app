import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserInfo {
  success? : string;
  username? : string;
  token? : string;
  error? : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false; 

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  getUserDetails(user) {
    // Post these details to API server and return user info
    return this.http.post<UserInfo>('http://localhost:3000/login', user);
  }
}
