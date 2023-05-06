import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  
  pageTitle = 'Product Detail';
  errorMessage = '';
  product : any;
  users: any;
  userId: any;
  LoggedIn = true; 
  showMessage: boolean = false;
  selectedType: string = 'tshirt';
  selectedColor: string = 'black';
  imageId : any;
  message: { type: string, text: string } | null = null;


  constructor(private route: ActivatedRoute, private reqS: RequestService, private http: HttpClient) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.imageId = params.get('id');

      this.reqS.get('https://localhost:44341/api/images/' + this.imageId).subscribe((res: any) => {
      this.product = res;
    })
    });

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

  onMessageClosed() {
    this.message = null;
  }

  selectType(type: string) {
    this.selectedType = type;
    console.log(this.selectedType);
  }
  selectColor(color: string) {
    this.selectedColor = color;
    console.log(this.selectedColor);
  }
  
  

  showTshirt() {
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null) {
      tshirt.style.display = 'block';
      hoodie.style.display = 'none';
      notebook.style.display = 'none';
    }
    this.selectType('tshirt');
  }
  showHoodie() {
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null) {
      tshirt.style.display = 'none';
      hoodie.style.display = 'block';
      notebook.style.display = 'none';
    }
    this.selectType('hoodie');
  }
  showNotebook() {
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null) {
      tshirt.style.display = 'none';
      hoodie.style.display = 'none';
      notebook.style.display = 'block';
    }
    this.selectType('notebook');
  }
  filterGreen(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'brightness(200%) sepia(50%) hue-rotate(110deg) saturate(150%)';
      hoodie.style.filter = 'brightness(200%) sepia(50%) hue-rotate(110deg) saturate(150%)';
      notebook.style.filter = 'brightness(200%) sepia(50%) hue-rotate(110deg) saturate(150%)';
    }
    this.selectColor('green');
  }

  filterGold(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'brightness(300%) sepia(100%) hue-rotate(-10deg) saturate(200%)';
      hoodie.style.filter = 'brightness(250%) grayscale(100%) sepia(100%) hue-rotate(-20deg) saturate(200%) contrast(0.8)';
      notebook.style.filter = 'brightness(250%) grayscale(100%) sepia(100%) hue-rotate(-20deg) saturate(200%) contrast(0.8)';
    }
    this.selectColor('gold');
  }

  filterPurple(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'brightness(110%) sepia(100%) hue-rotate(270deg) saturate(200%)';
      hoodie.style.filter = 'brightness(110%) sepia(100%) hue-rotate(270deg) saturate(200%)';
      notebook.style.filter = 'brightness(110%) sepia(100%) hue-rotate(270deg) saturate(200%)';
    }
    this.selectColor('purple');
  }

  filterRed(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'grayscale(100%) brightness(65%) sepia(100%) hue-rotate(-50deg) saturate(500%) contrast(0.8)';
      hoodie.style.filter = 'grayscale(100%) brightness(65%) sepia(100%) hue-rotate(-50deg) saturate(500%) contrast(0.8)';
      notebook.style.filter = 'grayscale(100%) brightness(65%) sepia(100%) hue-rotate(-50deg) saturate(500%) contrast(0.8)';
    }
    this.selectColor('red');
  }

  filterLightB(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'brightness(180%) sepia(50%) hue-rotate(180deg) saturate(150%)';
      hoodie.style.filter = 'brightness(140%) sepia(30%) hue-rotate(210deg) saturate(150%)';
      notebook.style.filter = 'brightness(140%) sepia(30%) hue-rotate(210deg) saturate(150%)';
    }
    this.selectColor('light blue');
  }

  filterBlack(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'none';
      hoodie.style.filter = 'none';
      notebook.style.filter = 'none';
    }
    this.selectColor('black');
  }

  filterPink(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'brightness(225%) sepia(70%) hue-rotate(300deg) saturate(150%)';
      hoodie.style.filter = 'brightness(225%) sepia(70%) hue-rotate(300deg) saturate(150%)';
      notebook.style.filter = 'brightness(225%) sepia(70%) hue-rotate(300deg) saturate(150%)';
    }
    this.selectColor('pink');
  }

  filterGray(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'brightness(200%) sepia(100%) hue-rotate(150deg) saturate(20%)';
      hoodie.style.filter = 'brightness(200%) sepia(100%) hue-rotate(150deg) saturate(20%)';
      notebook.style.filter = 'brightness(200%) sepia(100%) hue-rotate(150deg) saturate(20%)';
    }
    this.selectColor('gray');
  }

  filterBrown(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'brightness(180%) sepia(100%) hue-rotate(-20deg) saturate(200%)';
      hoodie.style.filter = 'brightness(180%) sepia(100%) hue-rotate(-20deg) saturate(200%)';
      notebook.style.filter = 'brightness(180%) sepia(100%) hue-rotate(-20deg) saturate(200%)';
    }
    this.selectColor('brown');
  }

  filterDarkB(){
    var tshirt = document.getElementById('tshirt');
    var hoodie = document.getElementById('hoodie');
    var notebook  = document.getElementById('notebook');
    if (tshirt != null && hoodie != null && notebook != null){
      tshirt.style.filter = 'grayscale(100%) brightness(45%) sepia(100%) hue-rotate(220deg) saturate(700%) contrast(1.1)';
      hoodie.style.filter = 'grayscale(100%) brightness(45%) sepia(100%) hue-rotate(220deg) saturate(700%) contrast(1.1)';
      notebook.style.filter = 'grayscale(100%) brightness(45%) sepia(100%) hue-rotate(220deg) saturate(700%) contrast(1.1)';
    }
    this.selectColor('dark blue');
  }

  

  addToCart() {
    const token: any = localStorage.getItem("jwt");
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const merchToAdd = this.imageId + "-" + this.selectedType + "-" + this.selectedColor;
  
    const object = {
      UserId: this.userId,
      Merch: merchToAdd
    };
  
    this.reqS.post('https://localhost:44341/api/cart/add-merch', object, { headers }).subscribe((res: any) => {
      this.message = { type: 'success', text: 'Added to cart!' };
    }, (error) => {
      this.message = { type: 'warning', text: 'You must be logged in to add to cart!' };
    });
  }
}

