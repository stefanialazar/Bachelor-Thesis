import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSeriesEpisodesComponent } from './track-series-episodes.component';

describe('TrackSeriesEpisodesComponent', () => {
  let component: TrackSeriesEpisodesComponent;
  let fixture: ComponentFixture<TrackSeriesEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSeriesEpisodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackSeriesEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
