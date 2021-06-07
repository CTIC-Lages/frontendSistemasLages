import { TestBed } from '@angular/core/testing';

import { PermissaoGuard } from './permissao-guard.service';

describe('PermissaoGuardService', () => {
  let service: PermissaoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissaoGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
