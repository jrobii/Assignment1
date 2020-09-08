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

  constructor(private router: Router, private userservice: UserService, private groupservice: GroupService, private channelservice: ChannelService) { }

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
    this.userservice.createNewUser(this.username, this.email, this.password, this.role).subscribe((data: any)=> {
      if (!data.ok) {
        alert("Error, a user with this username already exists!");
      } else {
        alert("Successfully created user: " + data.username)
        this.router.navigateByUrl("/admin");
      }
      
    });
  }

  addNewGroup() {
    if (this.groupName == undefined) {
      alert("Error! Name of group cannot be empty.")
    } else {
      this.groupservice.addNewGroup(this.groupName).subscribe((data: any)=> {
        if (!data.ok) {
          alert("Error, a group with this name already exists!");
        } else {
          alert("Successfully created group: " + data.name)
          this.router.navigateByUrl("/admin");
        }
      });
    } 
  }

  addNewChannel() {
    if (this.channelName == undefined) {
      alert("Error! The name of the channel cannot be empty.")
    } else {
      this.channelservice.addNewChannel(this.groupName, this.channelName).subscribe((data: any) => {
        if (!data.ok) {
          alert("Error, a channel with this name already exists!");
        } else {
          alert("Successfully created channel: " + data.name)
          this.router.navigateByUrl("/admin");
        }
      });
    }
  }

  getGroups() {
    this.groupservice.getGroups().subscribe((data: any) => {
      this.groups = data;
    })
  }

  deleteGroup(id:number) {
    this.groupservice.deleteGroup(id).subscribe((data: any) => {
      alert("Group with id: " + data.id + ", and name: " + data.name + " has been deleted.")
      this.router.navigateByUrl("/admin");
    });
  }

  deleteUser(id:number) {
    this.userservice.deleteUser(id).subscribe((data: any) => {
      alert("User with id: " + data.id + ", and username: " + data.username + " has been deleted.")
      this.router.navigateByUrl("/admin");
    });
  }

  getUsers() {
    this.userservice.getUsers().subscribe((data: any) => {
      this.users = data;
    })
  }

  addUserToGroup() {
    this.groupservice.addUserToGroup(this.groupName, this.username).subscribe((data:any) => {
      if (data.ok) {
        alert("Success! User " + data.username + " has been successfully added!");
      } else {
        alert("Error! User is already in this group!");
      }
    });
  }

  delUserFromGroup() {
    this.groupservice.deleteUserFromGroup(this.delusergroupName, this.delusername).subscribe((data: any) => {
      if (data.ok) {
        alert("Success! User " + data.username + " has been successfully deleted!");
      } else {
        alert("Error! User is not in this group!");
      }
    });
  }

  deleteChannel() {
    this.channelservice.deleteChannel(this.groupName, this.channelName).subscribe((data: any) => {
      if (data.ok) {
        alert("Success! Channel has been successfully deleted!");
      } else {
        alert("Error! Channel is not in this group!");
      }
    })
  }
}
