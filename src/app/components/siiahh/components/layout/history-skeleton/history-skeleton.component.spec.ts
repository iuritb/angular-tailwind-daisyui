import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySkeletonComponent } from './history-skeleton.component';

describe('HistorySkeletonComponent', () => {
  let component: HistorySkeletonComponent;
  let fixture: ComponentFixture<HistorySkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorySkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
