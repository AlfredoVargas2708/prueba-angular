import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get info', () => {
    service.getInfo('IPSA').subscribe({
      next: (data) => {
        expect(data).toBeDefined();
      },
      error: (error) => {
        console.log(error);
      }
    })
  });

  it('should get instruments', () => {
    service.getInstruments().subscribe({
      next: (data) => {
        expect(data).toBeDefined();
      },
      error: (error) => {
        console.log(error);
      }
    })
  });

  it('should get history', () => {
    service.getHistory('IPSA').subscribe({
      next: (data) => {
        expect(data).toBeDefined();
      },
      error: (error) => {
        console.log(error);
      }
    })
  });
});
