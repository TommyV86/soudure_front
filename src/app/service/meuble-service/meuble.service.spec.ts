import { TestBed } from '@angular/core/testing';

import { MeubleService } from './meuble.service';

describe('MeubleService', () => {
  let service: MeubleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeubleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
