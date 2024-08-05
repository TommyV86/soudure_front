import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMeubleComponent } from './form-meuble.component';

describe('FormMeubleComponent', () => {
  let component: FormMeubleComponent;
  let fixture: ComponentFixture<FormMeubleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMeubleComponent]
    });
    fixture = TestBed.createComponent(FormMeubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
