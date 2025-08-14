import { TestBed } from '@angular/core/testing';

import { ShowSnackbarService } from './show-snackbar.service';

describe('ShowSnackbarService', () => {
  let service: ShowSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
