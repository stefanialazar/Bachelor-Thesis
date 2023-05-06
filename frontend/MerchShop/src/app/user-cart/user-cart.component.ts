import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { RequestService } from '../core/request.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  allcartMerch: any;
  userMerch : any;
  userId: string = '';
  message: { type: string, text: string } | null = null;
  images: any;
  updatedUserMerch: any;

  constructor(private route: ActivatedRoute, private reqS: RequestService) {}

  ngOnInit(): void {
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      
      forkJoin({
        userCart: this.reqS.get('https://localhost:44341/api/cart/' + this.userId, { headers }),
        images: this.reqS.get('https://localhost:44341/api/images'),
      }).subscribe((result: { userCart: any, images: any }) => {
        this.allcartMerch = result.userCart[0];
        console.log(this.allcartMerch.merch);
        if(this.allcartMerch.merch != ''){
          this.userMerch = this.parseMerch(this.allcartMerch.merch);
          console.log(this.userMerch);
        
          this.images = result.images;
          console.log(this.images);
        
          this.updatedUserMerch = this.updateUserMerchWithImageUrls(this.userMerch, this.images);
          console.log(this.updatedUserMerch);
        }
      });
    });
  }
  

  parseMerch(item: string): string[][] {
    const splittedItems = item.split(', ');
    const itemMap: Map<string, { count: number, data: string[] }> = new Map();
  
    splittedItems.forEach((splittedItem) => {
      const [image, itemType, color] = splittedItem.split('-');
      let price = 0;
      switch (itemType) {
        case 'tshirt':
          price = 10;
          break;
        case 'hoodie':
          price = 20;
          break;
        case 'notebook':
          price = 5;
          break;
      }
      const key = `${image}-${itemType}-${color}`;
      const existingItem = itemMap.get(key);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        itemMap.set(key, { count: 1, data: [image, itemType, color, price.toString()] });
      }
    });
  
    return Array.from(itemMap.values()).map(item => [...item.data, item.count.toString()]);
  }
  
  calculateTotal(userMerch: string[][]): number {
    let totalPrice = 0;
  
    if(userMerch){
      userMerch.forEach(item => {
        const price = parseInt(item[3]);
        const quantity = parseInt(item[4]);
        totalPrice += price * quantity;
      });
    }
    return totalPrice;
  }

  findImageUrl(imageId: number, images: any[]): string {
    const imageObj = images.find(image => image.imageId === imageId);
  
    return imageObj ? imageObj.imageUrl : '';
  }

  updateUserMerchWithImageUrls(userMerch: string[][], images: any[]): string[][] {
    return userMerch.map(item => {
      const imageId = parseInt(item[0]);
      const imageUrl = this.findImageUrl(imageId, images);
      return [imageUrl, ...item.slice(1)];
    });
  }
  
  

  checkout() {
    
  }

  removeFromCart(index: number): void {
    const item = this.updatedUserMerch[index];
    const quantity = parseInt(item[4]);
  
    if (quantity > 1) {
      item[4] = (quantity - 1).toString();
    } else {
      this.updatedUserMerch.splice(index, 1);
    }
  
    // Update the cart in the backend
    const updatedCart = this.updatedUserMerch.map((item: any[]) => {
      return Array(item[4]).fill(`${item[1]}-${item[2]}-${item[0]}`).join(', ');
    }).join(', ');
  
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }); 

    const requestOptions = {
      headers: headers,
      body: updatedCart
    };

  
    this.reqS.put('https://localhost:44341/api/cart/' + this.userId, requestOptions).subscribe(() => {
      console.log('Cart updated successfully');
    }, error => {
      console.error('Error updating cart', error);
    });
  }
  

}
