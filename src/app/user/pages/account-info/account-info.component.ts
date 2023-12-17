// account-info.component.ts

import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/admin/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from 'src/app/admin/pages/manage-user/edit-user-dialog/edit-user-dialog.component';
import { DataSharingService } from 'src/app/admin/services/data-sharing.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  loggedInUser: User | null = null;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
    // Lấy thông tin người dùng đã đăng nhập từ dịch vụ
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  editUserInfo(): void {
    // Mở hộp thoại chỉnh sửa thông tin người dùng
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.loggedInUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Cập nhật thông tin người dùng đã đăng nhập với dữ liệu được chỉnh sửa
        this.loggedInUser = result;
        console.log("account: ", this.loggedInUser);

        // Lưu thông tin người dùng đã đăng nhập đã được cập nhật vào localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

        // Sử dụng service để thông báo sự thay đổi cho các thành phần khác
        this.dataSharingService.updateLoggedInUser(this.loggedInUser);

        // Cập nhật dữ liệu người dùng trong cơ sở dữ liệu
        this.userService.updateUser(result.maNguoiDung, result).subscribe(
          updatedUser => {
            // Tùy chọn: Xử lý phản hồi từ máy chủ
            console.log('Dữ liệu người dùng được cập nhật thành công:', updatedUser);
          },
          error => {
            console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
            // Tùy chọn: Xử lý lỗi
          }
        );
      }
    });
  }
}
