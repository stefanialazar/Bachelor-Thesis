import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './navbar-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

interface SideNavToggle {
  collapsed: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  constructor(private http: HttpClient) { }


  collapsed = false;
  navData = navbarData;
  users: any;
  LoggedIn = false;
  userId: any;
  
  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed});
  }

  ngOnInit(): void {

    document.body.classList.add('no-scroll');
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
        this.LoggedIn = true;
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

  generateLink(routeLink: string, requiresUserId: boolean): string[] {
    if (requiresUserId) {
      if (this.LoggedIn) {
        return [routeLink.replace(':userId', this.userId)];
      } else {
        return [];
      }
    }
    return [routeLink];
  }
  
  
  
  
  

}