import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSuccessComponent } from './mail-success.component';

describe('MailSuccessComponent', () => {
  let component: MailSuccessComponent;
  let fixture: ComponentFixture<MailSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailSuccessComponent]
    });
    fixture = TestBed.createComponent(MailSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
