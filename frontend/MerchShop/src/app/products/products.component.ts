import { Component, OnInit } from '@angular/core';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  user: any;
  constructor(private reqS: RequestService) { }
  images: any;
 
  ngOnInit(): void {

    this.reqS.get('https://localhost:44341/api/images').subscribe((res: any) => {
        this.images = res; 
    })
  }
}
