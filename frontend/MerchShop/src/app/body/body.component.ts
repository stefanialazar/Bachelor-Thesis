import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor() { }

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  ngOnInit(): void {
  }


  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 1080){
      styleClass = 'body-trimmed';

    } else if(this.collapsed && this.screenWidth <= 1080 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
