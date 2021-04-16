import { TestBed } from '@angular/core/testing';

import { DataFileService } from './data-file.service';

describe('DataFileService', () => {
  let service: DataFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
