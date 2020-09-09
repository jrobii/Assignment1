import { Component, OnInit } from '@angular/core';
import { User } from 'src/User';
import {GroupService } from '../services/group.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  user:User;
  groups:[] = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current'));
    this.getUsersGroups();
  }

  getUsersGroups() {
    this.groupService.getUsersGroups(this.user.id).subscribe((data: any) => {
      this.groups = data;
    });
  }

}
