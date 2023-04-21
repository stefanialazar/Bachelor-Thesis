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
  commentsReplies: any[] = [];

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
        this.processReplies();
         });
      }
    });
  }

  processReplies() {
    this.comments.forEach((element: any) => {
      this.reqS.get('https://localhost:44341/api/comments/' + element.commentId + '/replies').subscribe((res: any) => {
        if (res) {
          this.commentsReplies.push(res);
        } else {
          this.commentsReplies.push([]);
        }
      }, (error: any) => {
        if (error.status === 404) {
          this.commentsReplies.push([]);
        }
      });
    });
    console.log(this.comments);
    console.log(this.commentsReplies);
  }
  

  toggleReplyForm(comment: any): void {
    comment.showReplyForm = !comment.showReplyForm;
  }

  toggleReplies(comment: any): void {
    comment.showReplies = !comment.showReplies;
  }

  likeComment(comment: any): void {
    comment.score++;
  }
  
  dislikeComment(comment: any): void {
    comment.score--;
  }

  likeReply(reply: any): void {
    reply.score++;
  }
  
  dislikeReply(reply: any): void {
    reply.score--;
  }

}

