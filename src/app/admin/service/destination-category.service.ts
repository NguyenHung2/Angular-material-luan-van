import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = 'api/destination_category'

@Injectable({
  providedIn: 'root'
})
export class DestinationCategoryService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(url);
  }

  get(id: any) {
    return this.http.get(`${url}/${id}`);
  }

  addDestinationCategory(data: any) {
    return this.http.post(url, data);
  }

  updateCategory(id: any, data: any) {
    return this.http.put(`${url}/${id}`, data);
  }

  deleteCategory(id: any) {
    return this.http.delete(`${url}/${id}`);
  }
}
