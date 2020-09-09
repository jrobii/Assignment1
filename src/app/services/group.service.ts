import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/User';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  name:string;
  id:number

  constructor(private http: HttpClient) { }

  addNewGroup(user: User, name:string) {
    return this.http.post('http://localhost:3000/api/creategroup', {user: user, name: name});
  }

  getGroups() {
    return this.http.post('http://localhost:3000/api/getgroups', {});
  }

  deleteGroup(user:User, name:string) {
    return this.http.post('http://localhost:3000/api/deletegroup', {user: user, name: name});
  }

  addUserToGroup(user:User, name:string, username:string) {
    return this.http.post('http://localhost:3000/api/addusertogroup', {user:user, name: name, username: username});
  }

  deleteUserFromGroup(user:User, name:string, username:string) {
    return this.http.post('http://localhost:3000/api/deleteuserfromgroup', {user: user, name: name, username: username});
  }

  addNewAdmin(groupname:string, username:string) {
    return this.http.post('http://localhost:3000/api/addgroupadmin', {name: groupname, username: username});
  }

  addNewAssis(user:User, groupname:string, username:string) {
    return this.http.post('http://localhost:3000/api/addgroupassis', {user: user, name: groupname, username: username});
  }

  delAdmin(groupname:string, username:string) {
    return this.http.post('http://localhost:3000/api/delgroupadmin', {name: groupname, username: username});
  }

  delAssis(user: User, groupname:string, username:string) {
    return this.http.post('http://localhost:3000/api/delgroupassis', {user: user, name: groupname, username: username});
  }

  getUsersGroups(id:number) {
    return this.http.post('http://localhost:3000/api/getusersgroups', {id: id});
  }
}
