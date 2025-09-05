import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search-bar-component',
  imports: [
    CommonModule,
    FormsModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    AutoCompleteModule,
  ],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.scss',
})
export class SearchBarComponent implements OnInit {
  @Output() indexSelected = new EventEmitter<string>();

  constructor(private dataService: DataService) {}

  instruments: any[] = [];
  filteredInstruments: string[] = [];
  selectedInstrument: string = '';
  selectedIndex: string = 'IPSA';

  ngOnInit(): void {
    this.loadInstruments();
  }

  loadInstruments() {
    this.dataService.getInstruments().subscribe({
      next: (data) => {
        this.instruments = data.map((item) => item.name);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filterInstruments(event: any) {
    const query = event.query.toLowerCase();
    this.filteredInstruments = this.instruments.filter((instrument) =>
      instrument.toLowerCase().includes(query)
    );
  }

  onSelect(event: any) {
    this.indexSelected.emit(event.value);
  }

  onClear() {
    this.selectedIndex = '';
  }
}
