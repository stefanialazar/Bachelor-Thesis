import { Component, OnInit } from '@angular/core';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
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
  profilePicture: string = '';
  backgroundPicture: string = '';
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
        console.log(this.userId);
        this.firstName = tokenObject.firstname.charAt(0).toUpperCase() + tokenObject.firstname.slice(1);
        this.lastName = tokenObject.lastname.charAt(0).toUpperCase() + tokenObject.lastname.slice(1);
        this.users.forEach((element : any) => {
          if (element.id == this.userId){
            this.profilePicture = element.profilePicture;
            this.backgroundPicture = element.backgroundPicture;
          }
        });
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

  logOut() {
    localStorage.removeItem("jwt");
    window.location.href = 'http://localhost:4200/welcome';
  }

  newProfilePicture(){
    console.log("new pfp")
  }

  newBkgPicture(){
    console.log("new bkg")
  }

}
