/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerformancesService } from './performances.service';

describe('PerformancesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformancesService]
    });
  });

  it('should ...', inject([PerformancesService], (service: PerformancesService) => {
    expect(service).toBeTruthy();
  }));
});
