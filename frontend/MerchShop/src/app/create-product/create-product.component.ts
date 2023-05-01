import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../core/request.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  
  pageTitle = 'Product Detail';
  errorMessage = '';
  product : any;
  id : any;
  users: any;
  LoggedIn = true; 
  showMessage: boolean = false;

  constructor(private route: ActivatedRoute, private reqS: RequestService, private http: HttpClient) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      var id = params.get('id');

      this.reqS.get('https://localhost:44341/api/images/' + id).subscribe((res: any) => {
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
        console.log("da");
      }
    },
    error => {
      if(error.status = 401) {
       this.LoggedIn = false;
      }
    }
    );
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
  }

  

  addToCart() {
    this.showMessage = !this.showMessage;
  }


}
