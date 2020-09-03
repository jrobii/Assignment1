import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  name:string;
  id:number

  constructor(private http: HttpClient) { }

  addNewGroup(name:string) {
    return this.http.post('http://localhost:3000/api/creategroup', {name: name});
  }

  getGroups() {
    return this.http.post('http://localhost:3000/api/getgroups', {});
  }

  deleteGroup(id:number) {
    return this.http.post('http://localhost:3000/api/deletegroup', {id: id});
  }

  addUserToGroup(name:string, username:string) {
    return this.http.post('http://localhost:3000/api/addusertogroup', {name: name, username: username});
  }

  deleteUserFromGroup(name:string, username:string) {
    return this.http.post('http://localhost:3000/api/deleteuserfromgroup', {name: name, username: username});
  }
}
