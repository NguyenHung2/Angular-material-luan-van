import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DestinationCategory {
  maDanhMuc: number | null;
  tenDanhMuc: string;
}

@Injectable({
  providedIn: 'root',
})
export class DestinationCategoryService {
  private apiUrl = 'http://localhost:8080/api/destination-categories'; // Thay đổi URL nếu cần

  constructor(private http: HttpClient) {}

  getAllDestinationCategories(): Observable<DestinationCategory[]> {
    return this.http.get<DestinationCategory[]>(this.apiUrl);
  }

  getDestinationCategoryById(id: number): Observable<DestinationCategory> {
    return this.http.get<DestinationCategory>(`${this.apiUrl}/${id}`);
  }

  createDestinationCategory(category: DestinationCategory): Observable<DestinationCategory> {
    return this.http.post<DestinationCategory>(this.apiUrl, category);
  }

  updateDestinationCategory(id: number, updatedCategory: DestinationCategory): Observable<DestinationCategory> {
    return this.http.put<DestinationCategory>(`${this.apiUrl}/${id}`, updatedCategory);
  }

  deleteDestinationCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
