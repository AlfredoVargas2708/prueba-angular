import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar-component';
import { HttpClientModule } from '@angular/common/http';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load instruments', () => {
    component.loadInstruments();
    expect(component.instruments).toBeDefined();
  });

  it('should filter instruments', () => {
    component.filterInstruments({ query: 'IPSA' });
    expect(component.filteredInstruments).toBeDefined();
  });

  it('should select instrument', () => {
    component.onSelect({ value: 'IPSA' });
    expect(component.selectedIndex).toBe('IPSA');
  });

  it('should clear selection', () => {
    component.onClear();
    expect(component.selectedIndex).toBe('');
  });
});
