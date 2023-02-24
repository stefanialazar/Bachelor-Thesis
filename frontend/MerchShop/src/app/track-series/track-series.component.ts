import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../core/request.service';

@Component({
  selector: 'app-track-series',
  templateUrl: './track-series.component.html',
  styleUrls: ['./track-series.component.css']
})
export class TrackSeriesComponent implements OnInit{

  pageTitle = 'Product Detail';
  errorMessage = '';
  product : any;
  id : any;
  PressedWatch = false;
  users: any;
  LoggedIn = true; 

  constructor(private route: ActivatedRoute, private reqS: RequestService, private http: HttpClient) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      var id = params.get('id');

      this.reqS.get('https://localhost:44341/api/series/' + id).subscribe((res: any) => {
      this.product = res;
    })
    });

    const token: any= localStorage.getItem("jwt");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http.get('https://localhost:44341/api/users', { headers: headers }).subscribe((res: any) => {
      this.users = res;
      if(token){
        console.log("da");
      }
    },
    error => {
      if(error.status = 401) {
       this.LoggedIn = false;
      }
    }
    );
  }

}
