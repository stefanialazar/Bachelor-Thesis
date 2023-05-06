import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { RequestService } from '../core/request.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit{

  allordersUser: any;
  allcartMerch: any;
  userMerch : any;
  userId: string = '';
  message: { type: string, text: string } | null = null;
  images: any;
  updatedUserMerch: any;
  updatedUserOrders: any[] = [];

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
        userOrders: this.reqS.get('https://localhost:44341/api/orders/' + this.userId, { headers }),
        images: this.reqS.get('https://localhost:44341/api/images'),
      }).subscribe((result: { userOrders: any, images: any }) => {
        result.userOrders.forEach((order: any) => {
          this.allcartMerch = order;
          if(this.allcartMerch.merch != ''){
          this.userMerch = this.parseMerch(this.allcartMerch.merch);
          this.images = result.images;
          this.updatedUserMerch = this.updateUserMerchWithImageUrls(this.userMerch, this.images, order.orderDate.replace('T', " "));
          this.updatedUserOrders.push(this.updatedUserMerch);
        }
        });
      });
    });
    console.log(this.updatedUserOrders);
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

  updateUserMerchWithImageUrls(userMerch: string[][], images: any[], orderDate: string): string[][] {
    return userMerch.map(item => {
      const imageId = parseInt(item[0]);
      const imageUrl = this.findImageUrl(imageId, images);
      return [imageUrl, ...item.slice(1), orderDate];
    });    
  }
  

}
