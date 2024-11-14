import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotStarratingComponent } from './chatbot-starrating.component';

describe('ChatbotStarratingComponent', () => {
  let component: ChatbotStarratingComponent;
  let fixture: ComponentFixture<ChatbotStarratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotStarratingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotStarratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
