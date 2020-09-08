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

  user:User
  groups:[] = [];
  addgroupName:string
  delgroupName:string

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current'));
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups().subscribe((data: any) => {
      this.groups = data;
    });
  }

  deleteGroup(delgroupName:string) {
    this.groupService.deleteGroup(this.delgroupName).subscribe((data: any) => {
      if (data.ok) {
        alert("Group with id: " + data.id + ", and name: " + data.name + " has been deleted.")
      } else {
        alert("Error! This group does not exist!")
      }
    });
  }

  addNewGroup() {
    if (this.addgroupName == undefined) {
      alert("Error! Name of group cannot be empty.")
    } else {
      this.groupService.addNewGroup(this.addgroupName).subscribe((data: any)=> {
        if (!data.ok) {
          alert("Error, a group with this name already exists!");
        } else {
          alert("Successfully created group: " + data.name)
        }
      });
    } 
  }
}
