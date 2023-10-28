// list-post.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ListPost {
  maLoai: number;
  tenLoai: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListPostService {
  private apiUrl = 'http://localhost:8080/api/postCategories'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAllListPost(): Observable<ListPost[]> {
    return this.http.get<ListPost[]>(this.apiUrl);
  }

  createListPost(category: ListPost): Observable<ListPost> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<ListPost>(this.apiUrl, category, httpOptions);
  }

  updateListPost(categoryId: number, updatedCategory: ListPost): Observable<ListPost> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<ListPost>(`${this.apiUrl}/${categoryId}`, updatedCategory, httpOptions);
  }

  deleteListPost(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }
}
