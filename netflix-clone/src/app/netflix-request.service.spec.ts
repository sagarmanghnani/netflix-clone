import { TestBed } from '@angular/core/testing';

import { NetflixRequestService } from './netflix-request.service';

describe('NetflixRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetflixRequestService = TestBed.get(NetflixRequestService);
    expect(service).toBeTruthy();
  });
});
