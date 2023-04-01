import { Component, OnInit } from '@angular/core';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  userId: string = '';
  firstName: string = '';
  lastName: string = '';
  users: any;
  LoggedIn = true; 
 
  constructor(private reqS: RequestService, private http: HttpClient) { }

  ngOnInit(): void {

    const token: any= localStorage.getItem("jwt");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http.get('https://localhost:44341/api/users', { headers: headers }).subscribe((res: any) => {
      this.users = res;
      if(token){
        const tokenObject = this.decodeToken(token);
        this.userId = tokenObject.id;
        this.firstName = tokenObject.firstname.charAt(0).toUpperCase() + tokenObject.firstname.slice(1);
        this.lastName = tokenObject.lastname.charAt(0).toUpperCase() + tokenObject.lastname.slice(1);
      }
    },
    error => {
      if(error.status = 401) {
       this.LoggedIn = false;
      }
    });
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
