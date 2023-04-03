import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../core/request.service';

@Component({
  selector: 'app-track-series-episodes',
  templateUrl: './track-series-episodes.component.html',
  styleUrls: ['./track-series-episodes.component.css']
})
export class TrackSeriesEpisodesComponent implements OnInit {
  seasonNumber!: number;
  episodeNumber!: number;
  comments: any;

  constructor(private route: ActivatedRoute, private reqS: RequestService,) {}

  ngOnInit(): void {


    this.route.params.subscribe((params) => {
      const seasonEpisode = params['seasonepisode'];
      var seriesId = params['id'];
      const matches = seasonEpisode.match(/season(\d+)episode(\d+)/i);

      if (matches) {
        this.seasonNumber = parseInt(matches[1], 10);
        this.episodeNumber = parseInt(matches[2], 10);
        this.reqS.get('https://localhost:44341/api/comments/' + seriesId + '/season' + this.seasonNumber + 'episode' + this.episodeNumber).subscribe((res: any) => {
        this.comments = res;
        console.log(this.comments); 
    });

      }
    });
  }

  toggleReplyForm(comment: any): void {
    comment.showReplyForm = !comment.showReplyForm;
  }

}
