import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

export interface Activity {
  maHoatDong: number;
  tenHoatDong: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  maDiemDen: number;
  diemDen?: {
    maDiemDen: number;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private apiUrl = 'http://localhost:8080/api/activities'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl);
  }

  getActivityById(activityId: number): Observable<Activity> {
    const url = `${this.apiUrl}/${activityId}`;
    return this.http.get<Activity>(url);
  }

  createActivity(activity: Activity): Observable<Activity> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Activity>(this.apiUrl, activity, httpOptions);
  }

  updateActivity(activity: Activity): Observable<Activity> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Activity>(`${this.apiUrl}/${activity.maHoatDong}`, activity, httpOptions);
  }

  deleteActivity(activityId: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${activityId}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
