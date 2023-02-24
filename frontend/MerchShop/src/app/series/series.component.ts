import { Component, OnInit } from '@angular/core';
import { RequestService } from '../core/request.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit{

  constructor(private reqS: RequestService) { }
  series: any;

  ngOnInit(): void {

    this.reqS.get('https://localhost:44341/api/series').subscribe((res: any) => {
        this.series = res; 
        console.log(res);
    })
  }

}
