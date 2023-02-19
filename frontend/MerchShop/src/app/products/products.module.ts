import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { RouterModule } from '@angular/router';
import { CreateProductGuard } from '../create-product/create-product.guard';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from '../messages/messages.component';
import { ButtonsComponent } from '../buttons/buttons.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    MessagesComponent,
    ButtonsComponent,
  ],
  imports: [ CommonModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      {
        path: 'products/:id',
        canActivate: [CreateProductGuard],
        component: CreateProductComponent
      }
    ]),
  ],
  exports: [MessagesComponent, ButtonsComponent],
})
export class ProductModule { }

