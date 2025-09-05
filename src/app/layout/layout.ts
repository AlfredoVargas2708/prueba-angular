import { Component } from '@angular/core';
import { SearchBarComponent } from '../components/search-bar-component/search-bar-component';
import { HeaderComponent } from "../components/header-component/header-component";
import { ChartComponent } from "../components/chart-component/chart-component";
import { SummaryComponent } from "../components/summary-component/summary-component";
import { TabComponent } from "../components/tab-component/tab-component";

@Component({
  selector: 'app-layout',
  imports: [SearchBarComponent, HeaderComponent, ChartComponent, SummaryComponent, TabComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  index: string = 'IPSA';

  onIndexSelected(event: any) {
    this.index = event;
  }
}
