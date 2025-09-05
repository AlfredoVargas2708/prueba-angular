import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart-component';
import { HttpClientModule } from '@angular/common/http';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init chart', () => {
    component.initChart();
    expect(component.data).toBeDefined();
    expect(component.options).toBeDefined();
  });

  it('should change button', () => {
    component.changeButton('1D');
    expect(component.selectedButton).toBe('1D');
  });

  it('should change date', () => {
    component.changeDate();
    expect(component.selectedDates).toBeDefined();
  });

  it('should get group type', () => {
    component.getGroupingType();
    expect(component.selectedButton).toBe('1D');
  });

  it('should group by date', () => {
    component.groupByDate([]);
    expect(component.selectedButton).toBe('1D');
  });
});
