import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../core/request.service';
import jwt_decode from 'jwt-decode';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';

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
  allUserSeries: any;
  currentUserProgress: any;

  constructor(private route: ActivatedRoute, private reqS: RequestService, private http: HttpClient, private location: Location,) { }

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
        this.userId = tokenObject.id;
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
    
      forkJoin({
        series: this.reqS.get('https://localhost:44341/api/series/' + seriesId),
        seriesSeasonsList: this.reqS.get('https://localhost:44341/api/series-seasons/' + seriesId),
        allUserSeries: this.reqS.get('https://localhost:44341/api/user-seasons/' + seriesId),
      }).subscribe(({ series, seriesSeasonsList, allUserSeries }) => {
        this.series = series;
        this.seriesSeasonsList = seriesSeasonsList;
        this.allUserSeries = allUserSeries;
        this.currentUserProgress = this.allUserSeries.find((userSeries: any) => userSeries.userId === this.userId);
  
        if (this.currentUserProgress) {
          setTimeout(() => {
            this.selectSeason(null, this.currentUserProgress.currentSeason);
          }, 0);
        }
      });
    });
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  selectSeason(event: any, currentSeason?: string): void {
    for (let i = 1; i <= this.seriesSeasonsList.length; i++) {
      const divSeason = (<HTMLInputElement>document.getElementById("season" + i));
      divSeason.style.display = "none";
    }
  
    if (event) {
      var season = event.target.value;
      this.currentSeason = season.substr(season.length - 1); // => "no of season"
    } else if (currentSeason) {
      this.currentSeason = currentSeason;
    }
  
    var idOfSeason = "season" + this.currentSeason;
  
    const divSeason = (<HTMLInputElement>document.getElementById(idOfSeason));
    divSeason.style.display = "flex";
  }
  
  goBack(): void {
    this.location.back();
  }

}
