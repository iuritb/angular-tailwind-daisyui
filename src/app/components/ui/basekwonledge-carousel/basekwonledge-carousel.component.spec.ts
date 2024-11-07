import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasekwonledgeCarouselComponent } from './basekwonledge-carousel.component';

describe('BasekwonledgeCarouselComponent', () => {
  let component: BasekwonledgeCarouselComponent;
  let fixture: ComponentFixture<BasekwonledgeCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasekwonledgeCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasekwonledgeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
