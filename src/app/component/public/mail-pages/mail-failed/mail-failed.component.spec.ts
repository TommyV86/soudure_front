import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailFailedComponent } from './mail-failed.component';

describe('MailFailedComponent', () => {
  let component: MailFailedComponent;
  let fixture: ComponentFixture<MailFailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailFailedComponent]
    });
    fixture = TestBed.createComponent(MailFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
