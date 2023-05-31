import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../core/request.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  message: { type: string, text: string } | null = null;
  seriesTitle = '';
  yearReleased = 0;
  imdbRating = 0;
  genre = '';
  description = '';
  streamingPlatforms = '';
  seriesImageUrl = '';
  imageSeriesTitle = '';
  productImageUrl = '';
  ssSeriesTitle = '';
  newSeason = 0;
  newEpisodes = 0;

  constructor(private route: ActivatedRoute, private reqS: RequestService, private http: HttpClient) {}

  ngOnInit(): void {}

  addSerie(title: string, year: number, imdb: number, genre: string, description: string, platforms: string, imageUrl: string) {
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    
    const body = {
      SeriesTitle: title,
      YearReleased: year,
      ImdbRating: imdb,
      Genre: genre,
      Description: description,
      StreamingPlatform: platforms,
      SeriesImageUrl: imageUrl
    };

    console.log(body);

    this.http.post('https://localhost:44341/api/series/add', body, { headers }).subscribe(res => {
      console.log(res);
      this.message = { type: 'success', text: 'New series addded.' };
    }, err => {
      console.log(err);
      this.message = { type: 'danger', text: 'Error during series addition!' };
    });
  }

  addEpisodes(ssSeriesTitle: string, newSeason: number, newEpisodes: number) {
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    
    const body = {
      SeriesTitle: ssSeriesTitle,
      AiredSeason: newSeason,
      AiredEpisodes: newEpisodes
    };

    this.http.post('https://localhost:44341/api/series-seasons/add', body, { headers }).subscribe(res => {
      this.message = { type: 'success', text: 'New season & episodes added' };
    }, err => {
      this.message = { type: 'danger', text: 'Error during season & episodes upload!' };
    });
  }

  addProduct(seriesTitle: string, productImageUrl: string) {
    const token: any = localStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    
    const body = {
      SeriesTitle: seriesTitle,
      ImageUrl: productImageUrl
    };

    this.http.post('https://localhost:44341/api/images/add', body, { headers }).subscribe(res => {
      console.log(res);
      this.message = { type: 'success', text: 'New image added for merch.' };
    }, err => {
      console.log(err);
      this.message = { type: 'danger', text: 'Error during new image upload!' };
    });
  }

  onMessageClosed() {
    this.message = null;
  }
  
}

