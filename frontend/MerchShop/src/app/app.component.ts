import { Component } from '@angular/core';

interface SideNav {
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

  onToggleSideNav(data: SideNav): void {
    this.isSideNavCollapsed = data.collapsed;
  }
}

