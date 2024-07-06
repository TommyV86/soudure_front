import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMeubleComponent } from './details-meuble.component';

describe('DetailsMeubleComponent', () => {
  let component: DetailsMeubleComponent;
  let fixture: ComponentFixture<DetailsMeubleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsMeubleComponent]
    });
    fixture = TestBed.createComponent(DetailsMeubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
