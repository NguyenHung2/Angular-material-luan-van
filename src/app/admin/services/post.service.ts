import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  maBaiViet: number;
  tieuDe: string;
  tomTat: string;
  noiDung: string;
  ngayTao: Date;
  maLoai: number;
  maAnh: number;
  loai?: {
    maLoai: number;
    tenLoai: '';
  }
  anh?: {
    maAnh : number;
    duongDan: string;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(postId: number): Observable<Post> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.get<Post>(url);
  }

  addPost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Post>(this.apiUrl, post, httpOptions);
  }

  updatePost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Post>(`${this.apiUrl}/${post.maBaiViet}`, post, httpOptions);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
