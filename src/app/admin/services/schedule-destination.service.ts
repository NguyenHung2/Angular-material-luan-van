import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ScheduleDestination {
  maLichTrinhDiemDen: number;
  maLichTrinh: number;
  maDiemDen: number;
  thuTu: number;
  hoatDong: string;
  lichTrinh?: {
    maLichTrinh: number;
    tieuDe: string;
  };
  diemDen?: {
    maDiemDen: number;
    tenDiemDen: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleDestinationService {
  private apiUrl = 'http://localhost:8080/api/schedule-destinations'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getScheduleDestination(): Observable<ScheduleDestination[]> {
    return this.http.get<ScheduleDestination[]>(this.apiUrl);
  }

  getScheduleDestinationById(scheduleId: number): Observable<ScheduleDestination> {
    const url = `${this.apiUrl}/${scheduleId}`;
    return this.http.get<ScheduleDestination>(url);
  }

  addScheduleDestination(schedule: ScheduleDestination): Observable<ScheduleDestination> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<ScheduleDestination>(this.apiUrl, schedule, httpOptions);
  }

  updateScheduleDestination(schedule: ScheduleDestination): Observable<ScheduleDestination> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<ScheduleDestination>(`${this.apiUrl}/${schedule.maLichTrinhDiemDen}`, schedule, httpOptions);
  }

  deleteScheduleDestination(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}