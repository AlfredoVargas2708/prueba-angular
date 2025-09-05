import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Info } from '../../interfaces/info';
import { Price } from '../../interfaces/price';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() index: string = 'IPSA';
  info: Info = {} as Info;
  price: Price = {} as Price;

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadIndexData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && !changes['index'].firstChange) {
      this.loadIndexData();
    }
  }

  private loadIndexData(): void {
    if (this.index) {
      this.dataService.getInfo(this.index).subscribe({
        next: (data) => {
          this.info = data.info;
          this.price = data.price ? data.price : {} as Price;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
