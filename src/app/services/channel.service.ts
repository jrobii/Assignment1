import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  addNewChannel(groupname:string, name:string) {
    return this.http.post('http://localhost:3000/api/createchannel', {group: groupname, name: name});
  }

  deleteChannel(groupname:string, name:string) {
    return this.http.post('http://localhost:3000/api/deletechannel', {group: groupname, name: name});
  }
}
