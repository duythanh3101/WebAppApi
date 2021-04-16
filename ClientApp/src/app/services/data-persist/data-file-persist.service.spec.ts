import { TestBed } from '@angular/core/testing';

import { DataFilePersistService } from './data-file-persist.service';

describe('DataFilePersistService', () => {
  let service: DataFilePersistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFilePersistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
