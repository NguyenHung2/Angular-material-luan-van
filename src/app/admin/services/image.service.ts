import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from './destination.service';
import { Post } from './post.service';

export interface Image {
  maAnh: number;
  tenAnh: string;
  duongDan: string;
  ngayTao: Date;
  maDiemDen: Destination | null;
  maBaiViet: Post | null;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'http://localhost:8080/api/images'; 

  constructor(private http: HttpClient) {}

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }

  createImage(image: Image): Observable<Image> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Image>(this.apiUrl, image, httpOptions);
  }

  updateImage(imageId: number, updatedImage: Image): Observable<Image> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Image>(`${this.apiUrl}/${imageId}`, updatedImage, httpOptions);
  }

  deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${imageId}`);
  }
}
