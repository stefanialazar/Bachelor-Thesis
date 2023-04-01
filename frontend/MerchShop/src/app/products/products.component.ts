import { Component, OnInit } from '@angular/core';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  user: any;
  constructor(private reqS: RequestService) { }
  images: any;
  series: any;
  allImages: any;
  searchTerm = '';

  ngOnInit(): void {
    forkJoin({
      images: this.reqS.get('https://localhost:44341/api/images'),
      series: this.reqS.get('https://localhost:44341/api/series')
    }).subscribe(({ images, series }) => {
      this.images = images;
      this.allImages = images;
      this.series = series;
      if (this.images) {
        for (var i = 0; i < this.images.length; i++) {
          this.images[i].seriesTitle = this.series[this.images[i].seriesID - 1].seriesTitle;
          this.allImages[i].seriesTitle = this.series[this.images[i].seriesID - 1].seriesTitle;
        }
      }
    });
  }

  search(value: string): void {
    if (this.allImages && this.allImages.length > 0) {
      this.images = this.allImages.filter((val: { seriesTitle: string; }) =>
        val.seriesTitle.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
    
}
