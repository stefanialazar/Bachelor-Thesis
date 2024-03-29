import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CartComponent } from './cart/cart.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SeriesComponent } from './series/series.component';
import { TrackSeriesComponent } from './track-series/track-series.component';
import { TrackSeriesEpisodesComponent } from './track-series-episodes/track-series-episodes.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'series', component:SeriesComponent},
  {path: 'series/:id', component: TrackSeriesComponent},
  {path: 'series/:id/:seasonepisode', component: TrackSeriesEpisodesComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: CreateProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'cart/:id', component: UserCartComponent},
  {path: 'user/:id', component: EditUserComponent},
  {path: 'orders/:id', component: UserOrdersComponent},
  {path: 'user', component: UserPanelComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
