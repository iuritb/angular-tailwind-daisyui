import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectKnowledgeBaseComponent } from './select-knowledge-base.component';

describe('SelectKnowledgeBaseComponent', () => {
  let component: SelectKnowledgeBaseComponent;
  let fixture: ComponentFixture<SelectKnowledgeBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectKnowledgeBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectKnowledgeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
