import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChatConfigurationComponent } from './dialog-chat-configuration.component';

describe('DialogChatConfigurationComponent', () => {
  let component: DialogChatConfigurationComponent;
  let fixture: ComponentFixture<DialogChatConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogChatConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChatConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
