import { Component } from '@angular/core';

interface SideNav {
  screenWidth: number,
  collapsed: boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MerchShop';
  isSideNavCollapsed = false;
  screenWidth = 0 ;

  onToggleSideNav(data: SideNav): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}

