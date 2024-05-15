import { TestBed } from '@angular/core/testing';

import { AuthorisationByRoleGuard } from './authorisation-by-role.guard';

describe('AuthorisationByRoleGuard', () => {
  let guard: AuthorisationByRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorisationByRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
