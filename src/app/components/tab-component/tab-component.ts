import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { Tab } from '../../interfaces/tab';
import { InstrumentListComponent } from "../instrument-list-component/instrument-list-component";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tab-component',
  imports: [CommonModule, TabsModule, InstrumentListComponent],
  templateUrl: './tab-component.html',
  styleUrl: './tab-component.scss',
})
export class TabComponent implements OnInit {
  @Input() index: string = '';

  tabs: Tab[] = [
    {value: 'IPSA', text: 'IPSA'},
    {value: 'IGPA', text: 'IGPA'},
    {value: 'NASDAQ', text: 'NASDAQ'},
    {value: 'DOW JONES', text: 'DOW JONES'},
    {value: 'SP/BVL', text: 'SP/BVL'},
  ];
  instruments: any[] = [];
  order: string = 'asc';
  column: string = 'name';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getInstruments().subscribe((instruments) => {
      instruments = instruments.sort((a, b) => {
        if (a[this.column] < b[this.column]) {
          return this.order === 'asc' ? -1 : 1;
        }
        if (a[this.column] > b[this.column]) {
          return this.order === 'asc' ? 1 : -1;
        }
        return 0;
      });
      this.instruments = instruments;
    });
  }

  orderByColumn(column: string) {
    this.column = column;
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.loadData();
  }
}
