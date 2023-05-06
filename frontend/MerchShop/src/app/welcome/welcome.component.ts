import { Component, HostListener } from '@angular/core';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent{
  userId: string = '';
  firstName: string = '';
  lastName: string = '';
  users: any;
  LoggedIn = true; 
  gifSrc = '../../assets/products/ssGif.png';
  staticSrc = '../../assets/products/seriessync.jpg';
  currentSrc = this.staticSrc;
  showMessage: boolean = false;
 
  constructor(private reqS: RequestService, private http: HttpClient) { }

  ngOnInit(): void {
    // Check if the page has been reloaded
  if (!localStorage.getItem("reloaded")) {
    // If not, set the flag and reload the page
    localStorage.setItem("reloaded", "true");
    window.location.reload();
  } else {
    // If yes, remove the flag
    localStorage.removeItem("reloaded");
  }
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

  playGif(): void {
    this.currentSrc = this.gifSrc;
  }

  stopGif(): void {
    this.currentSrc = this.staticSrc;
  }

  copyEmailToClipboard(): void {
    const email = 'stefania.d.lazar@gmail.com';
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); 
  }

}
