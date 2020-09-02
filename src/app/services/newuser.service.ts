import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewuserService {

  username:string;
  password:string;
  role:string;

  constructor(private http: HttpClient) { }

  login(username:string, password:string, role:string) {
    return this.http.post('http://localhost:3000/api/create', {username: username, password: password, role: role});
  }
}
