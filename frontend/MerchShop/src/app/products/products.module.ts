import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { RouterModule } from '@angular/router';
import { CreateProductGuard } from '../create-product/create-product.guard';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from '../messages/messages.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import {SearchFilterPipe} from '../search-filter.pipe';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    MessagesComponent,
    ButtonsComponent,
    SearchFilterPipe,
    SearchBarComponent,
  ],
  imports: [ FormsModule, CommonModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      {
        path: 'products/:id',
        canActivate: [CreateProductGuard],
        component: CreateProductComponent
      }
    ]),
  ],
  exports: [MessagesComponent, 
    ButtonsComponent,
    SearchFilterPipe,
    SearchBarComponent],
})
export class ProductModule { }

