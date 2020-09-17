import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  user: User;

  ngOnInit(): void {  
    this.user = {username: '', password: ''}
  }

  loginUser() {
    console.log(this.user);

    this.authService.getUserDetails(this.user).subscribe(data => {
      if (data.success) {
        console.log(data);
        this.router.navigate(['home']);
        this.authService.setLoggedIn(true);
      } else {
        console.log(data.error);
      }
    });
  }

}
