import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { DetailUserDialogComponent } from './detail-user-dialog/detail-user-dialog.component';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  users: User[] = [];
  searchControl = new FormControl('');
  filteredUsers: MatTableDataSource<User> = new MatTableDataSource<User>(this.users);
  displayedColumns: string[] = ['maNguoiDung', 'tenNguoiDung', 'vaiTro', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newUser: User = {
    maNguoiDung: 0,
    tenNguoiDung: '',
    email: '',
    gioiTinh: '',
    diaChi: '',
    soDienThoai: '',
    ngaySinh: new Date(),
    matKhau: '',
    vaiTro: '',
    ngayDangKy: new Date()
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.filteredUsers.sort = this.sort;
    this.filteredUsers.paginator = this.paginator;
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;

      this.filteredUsers = new MatTableDataSource<User>(this.users);

      this.filteredUsers.sort = this.sort;
      this.filteredUsers.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredUsers.filter = filterValue;
  }

  showEditForm(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user }
    });

    dialogRef.afterClosed().subscribe((editedUser: User) => {
      if (editedUser) {
        this.userService.updateUser(editedUser.maNguoiDung, editedUser).subscribe(
          (updatedUser: User) => {
            this.loadUsers();
          },
          (error) => {
            console.error('Lỗi khi cập nhật người dùng:', error);
          }
        );
      }
    });
  }


  showDeleteForm(user: User): void {
    if (user.maNguoiDung !== null) {
      const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
        data: { user }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.userService.deleteUser(user.maNguoiDung as number).subscribe(
            () => {
              this.loadUsers();
            },
            (error) => {
              console.error('Lỗi khi xóa người dùng:', error);
            }
          );
        }
      });
    } else {
      // Xử lý trường hợp `user.maNguoiDung` là `null`.
    }
  }

  cancelAddForm() {
    this.resetForm();
  }

  resetForm() {
    this.newUser = {
      maNguoiDung: 0,
      tenNguoiDung: '',
      email: '',
      gioiTinh: '',
      diaChi: '',
      soDienThoai: '',
      ngaySinh: new Date(),
      matKhau: '',
      vaiTro: '',
      ngayDangKy: new Date()
    };
    this.showAddFormFlag = false;
  }

  showAddForm() {
    console.log('showAddForm được gọi');

    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: {
        user: this.newUser
      }
    });

    dialogRef.afterClosed().subscribe((addedUser: User) => {
      console.log('Hộp thoại thêm người dùng đã đóng');

      if (addedUser) {
        console.log('Đang thêm một người dùng mới:', addedUser);
        this.userService.addUser(addedUser).subscribe(
          (newUser: User) => {
            console.log('Người dùng mới được tạo thành công:', newUser);
            this.loadUsers();
            this.resetForm();
          },
          (error) => {
            console.error('Lỗi khi thêm người dùng mới:', error);
          }
        );
      }
    });
  }

  // Hiển thị form chi tiết
  showDetails(user: User): void {
    const dialogRef = this.dialog.open(DetailUserDialogComponent, {
      data: { user }
    });
  }
}
