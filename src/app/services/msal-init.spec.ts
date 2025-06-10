import { TestBed } from '@angular/core/testing';

import { MsalInit } from './msal-init';

describe('MsalInit', () => {
  let service: MsalInit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalInit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
