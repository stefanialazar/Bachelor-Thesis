import { Component, OnInit } from '@angular/core';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
import { getUTCdate } from '../core/helpers/dateHelpers';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit{

  constructor(private reqS: RequestService, private http: HttpClient) { }
  series: any;
  allSeries : any;
  startedSeries: any[] = [];
  notStartedSeries: any[] = [];
  searchTerm = '';
  allUserSeries: any;
  myUserSeries: any[] = [];
  userId: string = '';
  LoggedIn = true; 

  ngOnInit(): void {

    const token: any= localStorage.getItem("jwt");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.reqS.get('https://localhost:44341/api/series').subscribe((res: any) => {
        this.series = res; 
        this.allSeries = this.series;
    });

    this.http.get('https://localhost:44341/api/user-seasons', { headers: headers }).subscribe((res: any) => {
        this.allUserSeries = res;  
    });

    this.http.get('https://localhost:44341/api/users', { headers: headers }).subscribe((res: any) => {
      if(token){
        const tokenObject = this.decodeToken(token);
        this.userId = tokenObject.id;
      }
    },
    error => {
      if(error.status = 401) {
       this.LoggedIn = false;
      }
    });    

    this.findStartedSeries();
  }

  findMyUserSeries(){
    this.myUserSeries = [];
    if(this.LoggedIn == true){
      if(this.allUserSeries){
        this.allUserSeries.forEach( (value: any) => {
          if(value.userId == this.userId){
            this.myUserSeries.push(value);
          }
        }); 
      }
    }
  }

  findStartedSeries(){
    this.startedSeries = [];
    this.notStartedSeries = [];
    this.findMyUserSeries(); 
    if(this.LoggedIn == true){
      if(this.series){
        this.series.forEach( (serie: any) => {
          if(this.myUserSeries.find((mySerie) => mySerie.seriesId === serie.seriesId)){
            this.startedSeries.push(serie);
          }
          else {
            this.notStartedSeries.push(serie);
          }
        }); 
      }
    }
  }


  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }}

  search(value: string): void {
    this.series = this.allSeries.filter((val: { seriesTitle: string; }) =>
      val.seriesTitle.toLowerCase().includes(value)
    );
  }

}
