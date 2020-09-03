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
    return this.http.post('http://localhost:3000/api/create', {username: username, email: email, password: password, role: role});
  }
}
