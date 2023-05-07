import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../core/request.service';
import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

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
  userId: any;
  seriesId: any;
  message: { type: string, text: string } | null = null;

  constructor(private route: ActivatedRoute, private reqS: RequestService,) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const seasonEpisode = params['seasonepisode'];
      this.seriesId = params['id'];
      const matches = seasonEpisode.match(/season(\d+)episode(\d+)/i);

      if (matches) {
        this.seasonNumber = parseInt(matches[1], 10);
        this.episodeNumber = parseInt(matches[2], 10);
        this.reqS.get('https://localhost:44341/api/comments/' + this.seriesId + '/season' + this.seasonNumber + 'episode' + this.episodeNumber).subscribe((res: any) => {
        this.comments = res.reverse();
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

  async submitComment(commentBody: string, commentImageUrl: string): Promise<void> {
    const token: any= localStorage.getItem("jwt");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    if(token){
      const tokenObject = this.decodeToken(token);
      this.userId = tokenObject.id;

      if (!commentBody.trim()) {
        console.log('Comment body cannot be empty.');
        this.message = { type: 'warning', text: 'Comment body cannot be empty.' };
        return;
      }
  
      const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i;
      if (!commentImageUrl.match(imageUrlRegex) && commentImageUrl) {
        console.log('Invalid image URL.');
        this.message = { type: 'warning', text: 'Invalid image URL.' };
        return;
      }
  
      const createCommentDTO = {
        UserId: this.userId,
        SeriesId: this.seriesId,
        SeasonNumber: this.seasonNumber,
        EpisodeNumber: this.episodeNumber,
        CommentBody: commentBody,
        CommentImageURL: commentImageUrl,
      };
    
      try {
        const response = await this.reqS.post('https://localhost:44341/api/comments/create', createCommentDTO, { headers }).toPromise();
        console.log('Comment submitted:', response);
        this.message = { type: 'success', text: 'Comment submitted.' };
      } catch (error) {
        console.error('Error submitting comment:', error);
        this.message = { type: 'danger', text: 'Error submitting comment.' };
      }
    } else {
      this.message = { type: 'warning', text: 'You need to be logged in to submit a comment.' };
      return;
    } 
  }

  async submitReply(replyBody: string, replyImageUrl: string, replyCommentId: number){

    const token: any= localStorage.getItem("jwt");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    if(token){
      const tokenObject = this.decodeToken(token);
      this.userId = tokenObject.id;

      if (!replyBody.trim()) {
        console.log('Reply body cannot be empty.');
        this.message = { type: 'warning', text: 'Reply body cannot be empty.' };
        return;
      }
  
      const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i;
      if (!replyImageUrl.match(imageUrlRegex) && replyImageUrl) {
        console.log('Invalid image URL.');
        this.message = { type: 'warning', text: 'Invalid image URL.' };
        return;
      }
  
      const createReplyDTO = {
        UserId: this.userId,
        CommentId: replyCommentId,
        CommentBody: replyBody,
        CommentImageURL: replyImageUrl,
      };
    
      try {
        const response = await this.reqS.post('https://localhost:44341/api/comments/reply/create', createReplyDTO, { headers }).toPromise();
        console.log('Comment submitted:', response);
        this.message = { type: 'success', text: 'Reply submitted.' };
      } catch (error) {
        console.error('Error submitting comment:', error);
        this.message = { type: 'danger', text: 'Error submitting reply.' };
      }
    } else {
      this.message = { type: 'warning', text: 'You need to be logged in to submit a reply.' };
      return;
    } 

  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  onMessageClosed() {
    this.message = null;
  } 


}

