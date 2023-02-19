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
  PressedAdd = false;
  users: any;
  LoggedIn = true; 

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

  addToCart() {
    this.PressedAdd = true;

  }


}
