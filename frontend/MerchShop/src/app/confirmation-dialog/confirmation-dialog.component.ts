import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RequestService } from '../core/request.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  userId!: number;
  seriesId!: number;
  newSeason!: number;
  newEpisode!: number;

  
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reqS: RequestService, 
  ) {
    this.userId = data.userId;
    this.seriesId = data.seriesId;
    this.newSeason = data.newSeason;
    this.newEpisode = data.newEpisode;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  setAllPastEpisodesAsWatched(): void {
    this.updateUserProgress(this.userId, this.seriesId, this.newSeason, this.newEpisode);
    this.dialogRef.close(true);
  }

  updateUserProgress(userId: any, seriesId: number, season: number, episode: number): Observable<any> {
  const token: any = localStorage.getItem("jwt");
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  const body = {
    userId: userId,
    seriesId: seriesId,
    currentSeason: season,
    currentEpisode: episode
  };
  console.log(body);
  this.reqS.post('https://localhost:44341/api/user-seasons/update', body, { headers }).subscribe((res: any) => {
    console.log(res);
  })

  return this.reqS.post('https://localhost:44341/api/user-seasons/update', body, { headers });
  
}

  
}
