import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  @Input() mesId : string = ''
  @Input() messageText: string = ''; 
  @Output() messageClosed: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    const mes = document.getElementById(this.mesId);
    if (mes){
      mes.style.display = 'flex';
      mes.style.transition = 'all 2s';
    }
  }
  
  close(message: string) {
    const mes = document.getElementById(message);
    if (mes) {
      mes.style.display = 'none';
      mes.style.transition = 'all 2s';
    }
    this.messageClosed.emit();
  }
  

  
}
