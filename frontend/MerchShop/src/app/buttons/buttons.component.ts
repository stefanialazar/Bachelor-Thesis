import { Component, Input, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements AfterViewInit{

  @Input() buttonText : string = '';
  @Input() buttonId : string = '';
  @Input() buttonBkg: string = '';

  @ViewChildren('buttonColor') buttonColors!: QueryList<ElementRef>;
  
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.changeColor();
  }

  changeColor() {
    this.buttonColors.forEach((buttonColor: ElementRef) => {
      if (buttonColor.nativeElement.classList.contains('green')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', '#3f554e');
      }
      if (buttonColor.nativeElement.classList.contains('gold')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', '#a67a4b');
      }
      if (buttonColor.nativeElement.classList.contains('purple')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', '#46283b');
      }
      if (buttonColor.nativeElement.classList.contains('red')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', '#4f292a');
      }
      if (buttonColor.nativeElement.classList.contains('light-blue')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', '#3e4451');
      }
      if (buttonColor.nativeElement.classList.contains('black')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', 'black');
      }
      if (buttonColor.nativeElement.classList.contains('pink')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', '#7b585e');
      }
      if (buttonColor.nativeElement.classList.contains('gray')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', 'gray');
      }
      if (buttonColor.nativeElement.classList.contains('brown')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', '#735d43');
      }
      if (buttonColor.nativeElement.classList.contains('dark-blue')) {
        this.renderer.setStyle(buttonColor.nativeElement, 'backgroundColor', '#020F3A');
      }
    });
  }

}
