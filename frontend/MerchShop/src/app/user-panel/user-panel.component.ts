import { Component, OnInit } from '@angular/core';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
import { getUTCdate } from '../core/helpers/dateHelpers';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

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
        this.userId = 'Id: ' + tokenObject.id;
        this.firstName = 'First name: ' + tokenObject.firstname;
        this.lastName = 'Last name: ' + tokenObject.lastname;
      }
    },
    error => {
      if(error.status = 401) {
       this.LoggedIn = false;
      }
    }
    );
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  convertUTCdate(date: any) {
    return getUTCdate(date);
  }

  login(){
    window.location.href = 'http://localhost:4200/login';

  }

  register(){
    window.location.href = 'http://localhost:4200/register';

  }

  logOut() {
    localStorage.removeItem("jwt");
    window.location.href = 'http://localhost:4200/welcome';
 
  }

}
