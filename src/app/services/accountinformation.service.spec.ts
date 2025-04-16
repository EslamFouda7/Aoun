import { TestBed } from '@angular/core/testing';

import { AccountinformationService } from './accountinformation.service';

describe('AccountinformationService', () => {
  let service: AccountinformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountinformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
