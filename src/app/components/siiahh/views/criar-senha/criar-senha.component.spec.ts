import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarSenhaComponent } from './criar-senha.component';

describe('CriarSenhaComponent', () => {
  let component: CriarSenhaComponent;
  let fixture: ComponentFixture<CriarSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarSenhaComponent]
    });
    fixture = TestBed.createComponent(CriarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
