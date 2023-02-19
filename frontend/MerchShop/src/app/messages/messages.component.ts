import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  @Input() mesId : string = ''

  ngOnInit(): void {
    const mes = document.getElementById(this.mesId);
    if (mes){
      mes.style.display = 'flex';
      mes.style.transition = 'all 2s';
    }
  }

  
  close(message: string) {
    const mes = document.getElementById(message);
    if (mes){
      mes.style.display = 'none';
      mes.style.transition = 'all 2s';
      window.location.reload();
    }
  }

  
}
