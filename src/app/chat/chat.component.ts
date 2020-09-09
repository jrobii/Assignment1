import { Component, OnInit } from '@angular/core';
import { User } from 'src/User';
import {GroupService } from '../services/group.service';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private groupService: GroupService, private router: Router) { }

  user:User;
  groups:[] = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current'));
    this.getUsersGroups();
    if (!this.user) {
      this.router.navigateByUrl('/')
    }
  }

  getUsersGroups() {
    this.groupService.getUsersGroups(this.user.id).subscribe((data: any) => {
      this.groups = data;
    });
  }

}
