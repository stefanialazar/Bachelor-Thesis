import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateEpisodesComponent } from './navigate-episodes.component';

describe('NavigateEpisodesComponent', () => {
  let component: NavigateEpisodesComponent;
  let fixture: ComponentFixture<NavigateEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigateEpisodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
