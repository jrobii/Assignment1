import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../User';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-groupadmin',
  templateUrl: './groupadmin.component.html',
  styleUrls: ['./groupadmin.component.css']
})
export class GroupadminComponent implements OnInit {

  constructor(private router: Router, private groupService: GroupService) { }

  user:User;
  groups:[] = [];
  addgroupName:string;
  delgroupName:string;
  admingroupName:string;
  username:string;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current'));
    this.getGroups();
    if (!this.user) {
      this.router.navigateByUrl('/')
    }
    if (this.user.role != 's-admin' && this.user.role != 'g-admin' && this.user.role != 'assis') {
      this.router.navigateByUrl('/chat')
    }
  }

  getGroups() {
    this.groupService.getGroups().subscribe((data: any) => {
      this.groups = data;
    });
  }

  deleteGroup(delgroupName:string) {
    this.groupService.deleteGroup(this.user, this.delgroupName).subscribe((data: any) => {
      if (data.ok) {
        alert("Group with id: " + data.id + ", and name: " + data.name + " has been deleted.")
      } else if (!data.ok) {
        alert("Error! This group does not exist!")
      } else if (!data.valid) {
        alert("Error! You do not have permissions to delete this group!")
      }
    });
  }

  addNewGroup() {
    if (this.addgroupName == undefined) {
      alert("Error! Name of group cannot be empty.")
    } else {
      this.groupService.addNewGroup(this.user, this.addgroupName).subscribe((data: any)=> {
        if (!data.ok) {
          alert("Error, a group with this name already exists!");
        } else {
          alert("Successfully created group: " + data.name)
        }
      });
    } 
  }

  addNewAdmin() {
    this.groupService.addNewAdmin(this.admingroupName, this.username).subscribe((data: any) =>{
      if (data.ok) {
        alert("The user: " + data.username + " has been added as a group admin.")
      } else {
        alert("Error! Check the group name and username are correct!")
      }
    });
  }

  addNewAssis() {
    this.groupService.addNewAssis(this.user, this.admingroupName, this.username).subscribe((data: any) =>{
      if (data.ok) {
        alert("The user: " + data.username + " has been added as a group assis.")
      } else if (!data.ok) {
        alert("Error! Check the group name and username are correct")
      } else if (!data.valid) {
        alert("You do not have permission for this!")
      }
    });
  }

  delAdmin() {
    this.groupService.delAdmin(this.admingroupName, this.username).subscribe((data: any) =>{
      if (data.ok) {
        alert("The user: " + data.username + " has been removed as a group admin.")
      } else {
        alert("Error! Check the group name and username are correct!")
      }
    });
  }

  delAssis() {
    this.groupService.delAssis(this.user, this.admingroupName, this.username).subscribe((data: any) =>{
      if (data.ok) {
        alert("The user: " + data.username + " has been removed as a group assis.")
      } else if (!data.ok){
        alert("Error! Check the group name and username are correct!")
      } else if (!data.valid) {
        alert("You do not have permission for this!")
      }
    });
  }
}
