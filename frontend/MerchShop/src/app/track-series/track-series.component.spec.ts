import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSeriesComponent } from './track-series.component';

describe('TrackSeriesComponent', () => {
  let component: TrackSeriesComponent;
  let fixture: ComponentFixture<TrackSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSeriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
