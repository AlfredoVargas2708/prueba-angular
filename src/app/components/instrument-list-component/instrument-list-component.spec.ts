import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentListComponent } from './instrument-list-component';

describe('InstrumentListComponent', () => {
  let component: InstrumentListComponent;
  let fixture: ComponentFixture<InstrumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data and sort instruments', () => {
    component.sortInstruments();
    expect(component.instruments).toBeDefined();
    expect(component.order).toBeDefined();
    expect(component.column).toBeDefined();
  });
});
