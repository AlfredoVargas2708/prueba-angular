import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Json } from '../interfaces/json';
import { Chart } from '../interfaces/chart';
import { Info } from '../interfaces/info';
import { Data } from '../interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getInfo(instrument: string): Observable<Data> {
    return this.http.get<Json>(`/assets/resumen/${instrument}.json`).pipe(
      map((response: Json) => response.data)
    );
  }

  getInstruments(): Observable<any[]> {
    return this.http.get<Json>(`/assets/constituyentes/constituensList.json`).pipe(
      map((response: Json) => response.data.constituents ? response.data.constituents : [] as any[])
    )
  }

  getHistory(instrument: string): Observable<Chart[]> {
    return this.http.get<Json>(`/assets/history/history-${instrument}.json`).pipe(
      map((response: Json) => response.data.chart ? response.data.chart : [] as Chart[])
    )
  }
}
