import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private apiUrl = 'src/app/admin/data/destination.json';

  constructor(private http: HttpClient) {}

  getDestinations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
