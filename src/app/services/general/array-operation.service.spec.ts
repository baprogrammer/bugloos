import { TestBed } from '@angular/core/testing';

import { ArrayOperationService } from './array-operation.service';

describe('ArrayOperationService', () => {
  let service: ArrayOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
