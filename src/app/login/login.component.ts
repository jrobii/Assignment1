import { Component, OnInit } from '@angular/core';
import { LoginService } from '.././services/login.service';
import { Router } from '@angular/router';
import { User } from '../../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = "";
  password:string = "";
  user:User;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    this.loginService.login(this.username, this.password).subscribe((data: any) => {
      if (data.ok) {
        this.user = new User(data.username, data.email, data.role)
        localStorage.setItem('current', JSON.stringify(this.user));
      }  else {
        alert("Invalid Credentials!");
      }
    });
  }

}
