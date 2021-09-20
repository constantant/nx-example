import { TestBed } from '@angular/core/testing';

import { LibTreeService } from './lib-tree.service';

describe('LibTreeService', () => {
  let service: LibTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
