import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './navbar-data';

interface SideNavToggle {
  collapsed: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  constructor() { }


  collapsed = false;
  navData = navbarData;
  
  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed});
  }

}
