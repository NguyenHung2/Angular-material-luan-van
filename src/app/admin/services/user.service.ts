import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  maNguoiDung: number;
  tenNguoiDung: string;
  email: string;
  gioiTinh: string;
  diaChi: string;
  soDienThoai: string;
  ngaySinh: Date;
  matKhau: string;
  vaiTro: string;
  ngayDangKy: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    user.matKhau = this.hashPassword(user.matKhau);

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }

  updateUser(userId: number, user: User): Observable<User> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<User>(url, user, httpOptions);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in based on your authentication logic
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser !== null;
  }

  getLoggedInUser(): User | null {
    // Retrieve the logged-in user from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  }

  checkPhoneNumberExists(phoneNumber: string): Observable<boolean> {
    const url = `${this.apiUrl}/checkPhoneNumber/${phoneNumber}`;
    return this.http.get<boolean>(url);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.apiUrl}/checkEmail/${email}`;
    return this.http.get<boolean>(url);
  }

  hashPassword(password: string): string {
    return btoa(password); 
  }

  updatePasswordByPhoneNumber(phoneNumber: string, newPassword: string): Observable<User> {
    const url = `${this.apiUrl}/updatePassword/${phoneNumber}`;
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    const updatedUser = { soDienThoai: phoneNumber, matKhau: this.hashPassword(newPassword) };
    return this.http.put<User>(url, updatedUser, httpOptions);
  }
}
