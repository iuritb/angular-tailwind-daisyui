import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotMessagesComponent } from './chatbot-messages.component';

describe('ChatbotMessagesComponent', () => {
  let component: ChatbotMessagesComponent;
  let fixture: ComponentFixture<ChatbotMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
