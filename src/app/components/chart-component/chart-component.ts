import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DataService } from '../../services/data.service';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart-component',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule,
    ButtonGroupModule,
    DatePickerModule,
    FormsModule,
  ],
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.scss',
})
export class ChartComponent implements OnInit, OnChanges {
  data: any;
  options: any;

  buttonGroup: string[] = ['1D', '1S', '1M', '3M', '6M', '1Y', '5Y'];
  selectedButton: string = '1D';

  selectedDates: Date[] | null = null; // Inicializamos con null
  datesInTs: number[] = [];

  @Input() index: string = '';

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.index) this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && !changes['index'].firstChange) {
      this.initChart();
    }
  }

  // Parseamos fechas del backend "dd-MM-yyyy HH:mm:ss"
  parseCustomDate(str: string): Date {
    const [datePart, timePart] = str.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  getGroupingType(): 'day' | 'week' | 'month' | 'year' {
    switch (this.selectedButton) {
      case '1D':
        return 'day';
      case '1S':
        return 'week';
      case '1M':
      case '3M':
      case '6M':
        return 'month';
      case '1Y':
      case '5Y':
        return 'year';
      default:
        return 'day';
    }
  }

  groupByDate<T extends { datetimeLastPrice: string; lastPrice: number }>(
    data: T[],
    type: 'day' | 'week' | 'month' | 'year' = 'day'
  ): { key: string; avg: number }[] {
    const grouped = data.reduce((acc, item) => {
      const d = this.parseCustomDate(item.datetimeLastPrice);
      let key: string;

      switch (type) {
        case 'day':
          key = d.toISOString().split('T')[0];
          break;
        case 'month':
          key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'year':
          key = d.getFullYear().toString();
          break;
        case 'week':
          const week = this.getWeekNumber(d);
          key = `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
          break;
        default:
          key = 'unknown';
      }

      if (!acc[key]) acc[key] = { total: 0, count: 0 };
      acc[key].total += item.lastPrice;
      acc[key].count += 1;

      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.entries(grouped).map(([key, { total, count }]) => ({
      key,
      avg: total / count,
    }));
  }

  initChart() {
    this.dataService.getHistory(this.index).subscribe({
      next: (data) => {
        if (!data || data.length === 0) return;

        // Filtramos por rango de fechas si existe
        if (this.datesInTs.length === 2) {
          data = data.filter((item) => {
            const d = this.parseCustomDate(item.datetimeLastPrice).getTime();
            return d >= this.datesInTs[0] && d <= this.datesInTs[1];
          });
        }

        const type = this.getGroupingType();
        const grouped = this.groupByDate(data, type);

        this.data = {
          labels: grouped.map((g) => g.key),
          datasets: [
            {
              data: grouped.map((g) => g.avg),
              label: 'Precio',
              borderColor: '#42A5F5',
              backgroundColor: 'rgba(66, 165, 245, 0.2)',
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        };

        this.options = {
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { display: false }, grid: { drawTicks: false } },
            y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
          },
        };

        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error cargando chart', err),
    });
  }

  changeButton(button: string) {
    this.selectedButton = button;
    this.datesInTs = [];
    this.selectedDates = null;
    this.initChart();
  }

  changeDate() {
    // Validación segura para range
    if (!this.selectedDates || this.selectedDates.length !== 2) {
      this.datesInTs = [];
      return;
    }

    const [start, end] = this.selectedDates;
    if (start && end) {
      this.datesInTs = [start.getTime(), end.getTime()];
      this.initChart();
    } else {
      this.datesInTs = [];
    }
  }
}
