import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../core/request.service';

@Component({
  selector: 'app-navigate-episodes',
  templateUrl: './navigate-episodes.component.html',
  styleUrls: ['./navigate-episodes.component.css']
})
export class NavigateEpisodesComponent implements OnInit{

  seriesSeasonsList : any;

  constructor(private router: Router, private route: ActivatedRoute, private reqS: RequestService, private http: HttpClient) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      var seriesId = params.get('id');
      this.reqS.get('https://localhost:44341/api/series-seasons/' + seriesId).subscribe((res: any) => {
      this.seriesSeasonsList = res;
      })
    });
  }

  episodeBack(){
    var episodeBack = this.router.url.substr(0, 16);
    var se = this.router.url.substr(16);
    se = se.replace("episode", " ");
    const seArray = se.split(" ");
    var season = seArray[0];
    var episode = seArray[1];
    var episodeBackInt = Number(episode) - 1;
    var episodeBackString = episodeBackInt.toString();
    var seasonBackInt = Number(season) - 1;
    var seasonBackString = seasonBackInt.toString();

    if (Number(season) == 1){
      if (episodeBackInt == 0){
        alert("This is the first episode of season 1.");
      }
      else {
        episodeBack += season + 'episode' + episodeBackString;
        this.router.navigate([episodeBack]);
      }
    }
    else {
      if (episodeBackInt == 0){
        this.seriesSeasonsList.forEach(function (value : any) {
          if (seasonBackString == value.airedSeason){
            episodeBackString = value.airedEpisodes;
          }
        });
        episodeBack += seasonBackString + 'episode' + episodeBackString;
        console.log(episodeBack);
        this.router.navigate([episodeBack]);
      }
      else {
        episodeBack += season + 'episode' + episodeBackString;
        this.router.navigate([episodeBack]);
      }
    }
  }

  episodeNext(){
    var endOfSeason = 0;
    var lastSeason = '';
    var lastEpisode = '';
    var episodeNext = this.router.url.substr(0, 16);
    var se = this.router.url.substr(16);
    se = se.replace("episode", " ");
    const seArray = se.split(" ");
    var season = seArray[0];
    var episode = seArray[1];
    var episodeNextInt = Number(episode) + 1;
    var episodeNextString = episodeNextInt.toString();
    var seasonNextInt = Number(season) + 1;
    var seasonNextString = seasonNextInt.toString();

    this.seriesSeasonsList.forEach(function (value : any) {
      if (episode == value.airedEpisodes && season == value.airedSeason){
        episodeNextString = "1";
        episodeNext += seasonNextString + 'episode' + episodeNextString;
        endOfSeason = 1;
      }
      lastSeason = value.airedSeason;
      lastEpisode = value.airedEpisodes;
    });

    if(season == lastSeason && episode == lastEpisode){
      alert("This is the last aired episode of the series.");
    }
    else if (endOfSeason == 0){
      episodeNext += season + 'episode' + episodeNextString;
      this.router.navigate([episodeNext]);
    }
    else {
      this.router.navigate([episodeNext]);
    }
  }


  seriesHome(){
    var seriesHome = this.router.url.substr(0, this.router.url.length - 16);
    this.router.navigate([seriesHome]);
  }

}
