import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username:string;
  password:string;
  role:string;
  email:string

  constructor(private http: HttpClient) { }

  createNewUser(username:string, email:string, password:string, role:string) {
    return this.http.post('http://localhost:3000/api/createuser', {username: username, email: email, password: password, role: role});
  }

  deleteUser(id:number) {
    return this.http.post('http://localhost:3000/api/deleteuser', {id: id});
  }

  getUsers() {
    return this.http.post('http://localhost:3000/api/getusers', {});
  }
}
