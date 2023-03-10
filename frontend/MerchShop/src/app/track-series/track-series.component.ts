import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-track-series',
  templateUrl: './track-series.component.html',
  styleUrls: ['./track-series.component.css']
})
export class TrackSeriesComponent implements OnInit{

  pageTitle = 'Product Detail';
  errorMessage = '';
  series : any;
  seriesSeasonsList : any;
  seriesId : any;
  users: any;
  LoggedIn = true;
  userId: string = '';
  firstName: string = '';
  lastName: string = '';
  currentSeason: string = '';

  constructor(private route: ActivatedRoute, private reqS: RequestService, private http: HttpClient) { }

  ngOnInit(): void {

    const token: any= localStorage.getItem("jwt");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http.get('https://localhost:44341/api/users', { headers: headers }).subscribe((res: any) => {
      this.users = res;
      if(token){
        const tokenObject = this.decodeToken(token);
        this.userId = 'Id: ' + tokenObject.id;
        this.firstName = 'First name: ' + tokenObject.firstname;
        this.lastName = 'Last name: ' + tokenObject.lastname;
      }
    },
    error => {
      if(error.status = 401) {
       this.LoggedIn = false;
      }
    }
    );


    this.route.paramMap.subscribe(params => {

      var seriesId = params.get('id');

      this.reqS.get('https://localhost:44341/api/series/' + seriesId).subscribe((res: any) => {
      this.series = res;
      })

      this.reqS.get('https://localhost:44341/api/series-seasons/' + seriesId).subscribe((res: any) => {
      this.seriesSeasonsList = res;
      })
    });

    // this.http.get('https://localhost:44341/api/users', { headers: headers }).subscribe((res: any) => {
    //   this.users = res;
    //   if(token){
    //     console.log("da");
    //   }
    // },
    // error => {
    //   if(error.status = 401) {
    //    this.LoggedIn = false;
    //   }
    // }
    // );
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  selectSeason(event : any){
    for(let i=1; i<=this.seriesSeasonsList.length; i++){
      const divSeason = (<HTMLInputElement>document.getElementById("season" + i));
      divSeason.style.display = 'none';
    }

    var season = event.target.value;
    this.currentSeason = season.substr(season.length - 1); // => "no of season"
    var idOfSeason = "season" + this.currentSeason;
    
    const divSeason = (<HTMLInputElement>document.getElementById(idOfSeason));
    divSeason.style.display = 'flex';
  }

  goToEpisode(){
    console.log("hello");
  }

}
