import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrument-item-component',
  imports: [CommonModule],
  templateUrl: './instrument-item-component.html',
  styleUrl: './instrument-item-component.scss',
})
export class InstrumentItemComponent implements OnInit {
  @Input() instrument: any = {};

  ngOnInit(): void {
  }
}
