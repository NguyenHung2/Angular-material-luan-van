import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Schedule {
  maLichTrinh: number;
  tieuDe: string;
  moTa: string;
  maNguoiDung: number; 
  kinhDoXuatPhat: number;
  viDoXuatPhat: number;
  soLuongDiemDenToiDa: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://localhost:8080/api/schedules'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  getScheduleById(scheduleId: number): Observable<Schedule> {
    const url = `${this.apiUrl}/${scheduleId}`;
    return this.http.get<Schedule>(url);
  }

  addSchedule(schedule: Schedule): Observable<Schedule> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Schedule>(this.apiUrl, schedule, httpOptions);
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Schedule>(`${this.apiUrl}/${schedule.maLichTrinh}`, schedule, httpOptions);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
