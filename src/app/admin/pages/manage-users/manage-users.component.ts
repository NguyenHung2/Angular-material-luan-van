import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// Định nghĩa giao diện User
export interface User {
  userId: number;
  name: string;
  username: string;
  email: string;
  gender: string;
  dob: string;
  role: string;
}

// Sử dụng giao diện User
const users: User[] = [
  {
    userId: 1,
    name: 'Nguyen Van A',
    username: 'nguyenvana',
    email: 'nguyenvana@example.com',
    gender: 'Nam',
    dob: '1990-01-15',
    role: 'Admin',
  },
  {
    userId: 2,
    name: 'Tran Thi B',
    username: 'tranthib',
    email: 'tranthib@example.com',
    gender: 'Nữ',
    dob: '1985-08-22',
    role: 'User',
  },
  // Thêm các người dùng khác vào đây
];

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent {
  displayedColumns: string[] = ['userId', 'name', 'username', 'email', 'gender', 'dob', 'role', 'actions'];
  dataSource = new MatTableDataSource(users);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(userId: number) {
    console.log(`Sửa người dùng có ID: ${userId}`);
  }

  deleteUser(userId: number) {
    console.log(`Xóa người dùng có ID: ${userId}`);
  }
}
