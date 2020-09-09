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

  deleteGroup(name:string) {
    return this.http.post('http://localhost:3000/api/deletegroup', {name: name});
  }

  addUserToGroup(name:string, username:string) {
    return this.http.post('http://localhost:3000/api/addusertogroup', {name: name, username: username});
  }

  deleteUserFromGroup(name:string, username:string) {
    return this.http.post('http://localhost:3000/api/deleteuserfromgroup', {name: name, username: username});
  }

  addNewAdmin(groupname:string, username:string) {
    return this.http.post('http://localhost:3000/api/addgroupadmin', {name: groupname, username: username});
  }

  addNewAssis(groupname:string, username:string) {
    return this.http.post('http://localhost:3000/api/addgroupassis', {name: groupname, username: username});
  }

  delAdmin(groupname:string, username:string) {
    return this.http.post('http://localhost:3000/api/delgroupadmin', {name: groupname, username: username});
  }

  delAssis(groupname:string, username:string) {
    return this.http.post('http://localhost:3000/api/delgroupassis', {name: groupname, username: username});
  }

  getUsersGroups(id:number) {
    return this.http.post('http://localhost:3000/api/getusersgroups', {id: id});
  }
}
