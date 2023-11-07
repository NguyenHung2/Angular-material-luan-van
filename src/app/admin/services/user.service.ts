import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User {
  maNguoiDung: number;
  tenNguoiDung: string;
  email: string;
  gioiTinh: string;
  diaChi: string;
  ngaySinh: Date;
  matKhau: string;
  vaiTro: string;
  ngayDangKy: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Thay đổi URL API backend theo đường dẫn thích hợp

  constructor(private http: HttpClient) {}

  // Lấy danh sách người dùng từ API
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Lấy một người dùng dựa trên mã người dùng
  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  // Thêm một người dùng mới
  addUser(user: User): Observable<User> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }

  // Cập nhật thông tin người dùng
  updateUser(user: User): Observable<User> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.http.put<User>(`${this.apiUrl}/${user.maNguoiDung}`, user, httpOptions);
  }

  // Xóa người dùng dựa trên mã người dùng
  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
}
