import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../User';
import { ChannelService } from '../services/channel.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-channeladmin',
  templateUrl: './channeladmin.component.html',
  styleUrls: ['./channeladmin.component.css']
})
export class ChanneladminComponent implements OnInit {

  constructor(private router: Router, private channelService: ChannelService, private groupService: GroupService) { }

  addchannelName:string
  addgroupName:string
  delchannelName:string
  delgroupName:string
  username:string
  user:User;
  groups:[] = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('current'));
    this.getGroups();
  }

  addNewChannel() {
    if (this.addchannelName == undefined) {
      alert("Error! The name of the channel cannot be empty.")
    } else {
      this.channelService.addNewChannel(this.addgroupName, this.addchannelName).subscribe((data: any) => {
        if (!data.ok) {
          alert("Error, a channel with this name already exists!");
        } else {
          alert("Successfully created channel: " + data.name)
          this.router.navigateByUrl("/admin");
        }
      });
    }
  }

  deleteChannel() {
    this.channelService.deleteChannel(this.delgroupName, this.delchannelName).subscribe((data: any) => {
      if (data.ok) {
        alert("Success! Channel has been successfully deleted!");
      } else {
        alert("Error! Channel is not in this group!");
      }
    });
  }

  getGroups() {
    this.groupService.getGroups().subscribe((data: any) => {
      this.groups = data;
    })
  }

}
