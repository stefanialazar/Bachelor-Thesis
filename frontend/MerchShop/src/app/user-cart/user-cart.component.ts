import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { RequestService } from '../core/request.service';
import { forkJoin } from 'rxjs';
import { concatMap } from 'rxjs/operators';


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
        if(this.allcartMerch.merch != ''){
          this.userMerch = this.parseMerch(this.allcartMerch.merch);
          this.images = result.images;
          this.updatedUserMerch = this.updateUserMerchWithImageUrls(this.userMerch, this.images);
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
  
  removeFromCart(index: number): void {
    const itemToRemove = this.userMerch[index];
    const quantityToRemove = parseInt(itemToRemove[4]);

    let updatedItems: string[] = [];

    this.userMerch.forEach((item: any[], i: number) => {
      if (i !== index) {
        // Add items that are not being removed
        updatedItems.push(`${item[0]}-${item[1]}-${item[2]}`);
      } else {
        // Add the item being removed (quantity - 1) times
        for (let j = 0; j < (quantityToRemove - 1); j++) {
          updatedItems.push(`${item[0]}-${item[1]}-${item[2]}`);
        }
      }
    });

    const updatedCart = updatedItems.join(', ');

    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }); 

    const userUpdatedCart = {
      Merch: updatedCart,
    };


    this.reqS.post('https://localhost:44341/api/cart/' + this.userId, userUpdatedCart, { headers }).subscribe(() => {
      this.message = { type: 'success', text: 'Cart updated successfully' };
          setTimeout(() => {
            window.location.reload();
          }, 2000);  
        }, (error) => {
          console.log('Error updating cart:', error);
          this.message = { type: 'danger', text: 'Error updating cart' };
    });    
  }

  checkout() {
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }); 

    const userUpdatedCart = {
      Merch: "",
    };

    const now = new Date();
    

    const newOrder = {
      OrderDate: now,
      UserId: this.userId,
      Merch: this.allcartMerch.merch,
    }
    console.log(newOrder);

    const updateCartRequest = () => this.reqS.post('https://localhost:44341/api/cart/' + this.userId, userUpdatedCart, { headers });
    const createOrderRequest = () => this.reqS.post('https://localhost:44341/api/orders/', newOrder, { headers });

    createOrderRequest().pipe(
      concatMap(() => updateCartRequest())
    ).subscribe(
      (response) => {
        this.message = { type: 'success', text: 'Order placed successfully!' };
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (error) => {
        console.log('Error updating order and cart:', error);
        this.message = { type: 'danger', text: 'Error placing order' };
      });
  }

  
  onMessageClosed() {
    this.message = null;
  }
  

}
