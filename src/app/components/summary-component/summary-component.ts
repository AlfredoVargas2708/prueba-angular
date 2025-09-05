import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DataService } from '../../services/data.service';
import { Info } from '../../interfaces/info';
import { Price } from '../../interfaces/price';

@Component({
  selector: 'app-summary-component',
  imports: [CommonModule, TabsModule],
  templateUrl: './summary-component.html',
  styleUrl: './summary-component.scss',
})
export class SummaryComponent implements OnInit {
  @Input() index: string = '';
  info: Info = {} as Info;
  price: Price = {} as Price;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.dataService.getInfo(this.index).subscribe({
      next: (data) => {
        this.info = data.info;
        this.price = data.price ? data.price : ({} as Price);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
