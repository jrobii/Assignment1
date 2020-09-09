import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/User';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  addNewChannel(user:User, groupname:string, name:string) {
    return this.http.post('http://localhost:3000/api/createchannel', {user: user, group: groupname, name: name});
  }

  deleteChannel(user:User, groupname:string, name:string) {
    return this.http.post('http://localhost:3000/api/deletechannel', {user: user, group: groupname, name: name});
  }

  addUserToChannel(user:User, groupname:string, channelname:string, username:string) {
    return this.http.post('http://localhost:3000/api/addusertochannel', {user: user, group: groupname, channel: channelname, username: username});
  }

  delUserFromChannel(user: User, groupname:string, channelname:string, username:string) {
    return this.http.post('http://localhost:3000/api/deluserfromchannel', {user: user, group: groupname, channel: channelname, username: username});
  }
}
