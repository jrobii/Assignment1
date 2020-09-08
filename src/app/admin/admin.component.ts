import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../User';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private groupService: GroupService, private channelService: ChannelService) { }

  user:User;
  username:string;
  password:string;
  role:string;
  email:string;
  users:[] = [];
  groups:[] = [];
  id:number;
  groupid:number;
  groupName:string;
  delusergroupName:string;
  delusername:string;
  channelName:string;


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current'));
    this.getUsers();
    this.getGroups();
  }

  addNewUser() {
    this.userService.createNewUser(this.username, this.email, this.password, this.role).subscribe((data: any)=> {
      if (!data.ok) {
        alert("Error, a user with this username already exists!");
      } else {
        alert("Successfully created user: " + data.username)
        this.router.navigateByUrl("/admin");
      }
    });
  }

  getGroups() {
    this.groupService.getGroups().subscribe((data: any) => {
      this.groups = data;
    })
  }

  deleteUser(id:number) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      alert("User with id: " + data.id + ", and username: " + data.username + " has been deleted.")
      this.router.navigateByUrl("/admin");
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    })
  }

  addUserToGroup() {
    this.groupService.addUserToGroup(this.groupName, this.username).subscribe((data:any) => {
      if (data.ok) {
        alert("Success! User " + data.username + " has been successfully added!");
      } else {
        alert("Error! User is already in this group!");
      }
    });
  }

  delUserFromGroup() {
    this.groupService.deleteUserFromGroup(this.delusergroupName, this.delusername).subscribe((data: any) => {
      if (data.ok) {
        alert("Success! User " + data.username + " has been successfully deleted!");
      } else {
        alert("Error! User is not in this group!");
      }
    });
  }

  addUserToChannel() {
    this.channelService.addUserToChannel(this.groupName, this.channelName, this.username).subscribe((data: any) => {
      if (data.ok) {
        alert("Success! User has been successfully added to the Channel!");
      } else {
        alert("Error! User is not in this Channel!");
      }
    });
  }

  delUserFromChannel() {
    this.channelService.delUserFromChannel(this.groupName, this.channelName, this.username).subscribe((data: any) => {
      if (data.ok) {
        alert("Success! User has been successfully deleted from the channel!");
      } else {
        alert("Error! User is not in this channel!");
      }
    });
  }

    //Add group admin
    //Remove group admin
    //add group assistant
    //remove group assistant
}