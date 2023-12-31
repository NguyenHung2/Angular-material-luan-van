import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Destination {
  maDiemDen: number;
  tenDiemDen: string;
  moTa: string;
  kinhDo: number | null;
  viDo: number | null;
  diaChi: string;
  ngayTao: Date;
  maDanhMuc: number;
  maAnh: number;
  danhMuc?: {
    maDanhMuc: number | undefined;
    tenDanhMuc: string;
  };
  anh?: {
    maAnh: number;
    duongDan: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = 'http://localhost:8080/api/destinations';

  constructor(private http: HttpClient) { }

  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl);
  }

  getDestinationById(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/${id}`);
  }

  createDestination(destination: Destination): Observable<Destination> {
    return this.http.post<Destination>(this.apiUrl, destination);
  }

  updateDestination(id: number, destination: Destination): Observable<Destination> {
    return this.http.put<Destination>(`${this.apiUrl}/${id}`, destination);
  }

  deleteDestination(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
