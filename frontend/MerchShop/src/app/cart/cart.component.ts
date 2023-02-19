import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any;
  displayedColumns: string[] = ['quantity','name', 'price', 'pointsPrice', 'addRemove'];
  totalValue: number = 0;
  totalPointsValue: number = 0;
  constructor(private reqS: RequestService, private router: Router) { }

  ngOnInit(): void {
    const tableData: any = this.reqS.get('https://localhost:44302/api/orders/getCartOrder').subscribe((data: any) => {
      this.cartProducts = data;
      data.forEach((element: {
        quantity: number;
        pointsPrice: number; price: number; 
}) => {
        this.totalValue += element.price * element.quantity;
        this.totalPointsValue += element.pointsPrice * element.quantity;
      });
    });
  
    
  }
  addItem(row: any) {
    this.reqS.put('https://localhost:44302/api/orders/addItemToCart', row).subscribe(res => {
       this.cartProducts = res;
       this.totalValue += row.price;
       this.totalPointsValue += row.pointsPrice;
    })
   
    
  }
  removeItem(row: any) {
    this.reqS.put('https://localhost:44302/api/orders/removeItemFromCart', row).subscribe(res => {
        this.cartProducts = res;
        this.totalValue -= row.price;
        this.totalPointsValue -= row.pointsPrice;
    })
    
  }
  placeOrder() {
    const token: any= localStorage.getItem("jwt");
    if(token){
      const tokenObject = this.decodeToken(token);
      var userId = tokenObject.id;
    }
    const obj = {
      products: this.cartProducts,
      user: userId,
      additionalNotes:  (<HTMLInputElement>document.getElementById("notes")).value
    }
    this.reqS.post('https://localhost:44302/api/orders/placeOrder', obj).subscribe((res: any) => {
      if(res){
        this.router.navigate(['products']);
        Swal.fire('Order placed!', 'Order placed successfully', 'success');
      }
      
    },
    _err => {
      Swal.fire('Error', 'You do not have enough points', 'error');
    }
   
 ) 
}
 
    
decodeToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch(Error) {
    return null;
  }
}
}
