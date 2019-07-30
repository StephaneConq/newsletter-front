import { TestBed } from '@angular/core/testing';

import { NewsletterApiService } from './newsletter-api.service';

describe('NewsletterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsletterApiService = TestBed.get(NewsletterApiService);
    expect(service).toBeTruthy();
  });
});
