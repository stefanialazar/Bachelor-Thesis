import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarModule } from './navbar/navbar.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BodyComponent } from './body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductModule } from './products/products.module';
import { SeriesComponent } from './series/series.component';
import { TrackSeriesComponent } from './track-series/track-series.component';
import { NavigateEpisodesComponent } from './navigate-episodes/navigate-episodes.component';
import { TrackSeriesEpisodesComponent } from './track-series-episodes/track-series-episodes.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import {SearchFilterPipe} from './search-filter.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    BodyComponent,
    CartComponent,
    UserPanelComponent,
    WelcomeComponent,
    SeriesComponent,
    TrackSeriesComponent,
    NavigateEpisodesComponent,
    TrackSeriesEpisodesComponent,
    SearchBarComponent,
    SearchFilterPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule,
    ProductModule,
    FormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
