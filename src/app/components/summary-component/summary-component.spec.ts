import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary-component';
import { HttpClientModule } from '@angular/common/http';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data', () => {
    component.loadInfo();
    expect(component.info).not.toBeNull();
    expect(component.price).not.toBeNull();
  });
});
