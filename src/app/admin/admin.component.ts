import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userservice: UserService) { }

  user:User;
  username:string;
  password:string;
  role:string;
  email:string;


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current'));
  }

  addNewUser() {
    this.userservice.createNewUser(this.username, this.email, this.password, this.role).subscribe((data: any)=> {
      if (!data.ok) {
        alert("Error, a user with this username already exists!");
      } else {
        alert("Successfully created user: " + data.username)
      }
    });
  }
}
