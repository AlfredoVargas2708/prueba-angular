import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { InstrumentItemComponent } from "../instrument-item-component/instrument-item-component";

@Component({
  selector: 'app-instrument-list-component',
  imports: [CommonModule, InstrumentItemComponent],
  templateUrl: './instrument-list-component.html',
  styleUrl: './instrument-list-component.scss'
})
export class InstrumentListComponent implements OnInit{
  @Input() instruments: any[] = [];
  @Input() order: string = 'asc';
  @Input() column: string = 'name';

  ngOnInit(): void {
    this.instruments.sort((a, b) => {
      if (a[this.column] < b[this.column]) {
        return this.order === 'asc' ? -1 : 1;
      }
      if (a[this.column] > b[this.column]) {
        return this.order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
