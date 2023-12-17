import { UserService } from 'src/app/admin/services/user.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  username: string = '';

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    // Lấy tên người dùng từ LocalStorage sau khi đăng nhập
    this.username = localStorage.getItem('loggedInUsername') || '';
    console.log(localStorage);
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Người dùng đã xác nhận đăng xuất
        // Thực hiện các công việc đăng xuất ở đây
        this.username = ''; // Xóa tên người dùng từ giao diện người dùng
        // Thực hiện các công việc đăng xuất, ví dụ: xóa thông tin đăng nhập từ localStorage
        localStorage.removeItem('loggedInUsername');
        // Chuyển hướng đến trang bảo mật sau khi đăng xuất
        this.router.navigate(['/trang-chu']);
      }
    });
  }
}
