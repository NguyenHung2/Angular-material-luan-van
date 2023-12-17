// login.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginVisible: boolean = true;
  isSignUpVisible: boolean = false;
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  loginError: string = '';
  readonly MIN_PASSWORD_LENGTH: number = 8;

  constructor(
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>,
  ) { }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      const loggedInUser = this.userService.getLoggedInUser();
      console.log('User is already logged in:', loggedInUser);
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Reset error messages
    this.loginError = '';

    // Check if username or password is empty
    if (!this.username || !this.password) {
      this.loginError = 'Vui lòng nhập tài khoản và mật khẩu!';
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
    if (!phoneRegex.test(this.username)) {
      this.loginError = 'Số điện thoại không hợp lệ.';
      return;
    }

    // Validate password length
    if (this.password.length < this.MIN_PASSWORD_LENGTH) {
      this.loginError = `Mật khẩu phải có ít nhất ${this.MIN_PASSWORD_LENGTH} ký tự.`;
      return;
    }

    // Continue with the login logic
    this.userService.getAllUsers().subscribe(
      users => {
        const user = users.find(u => u.soDienThoai === this.username && u.matKhau === this.password);

        if (user) {
          // Log the user data after a successful login
          console.log('Logged in user:', user);

          // Reset the error message on successful login
          this.loginError = '';

          // Lấy thông tin người dùng đầy đủ từ UserService bằng mã người dùng
          this.userService.getUserById(user.maNguoiDung).subscribe(
            fullUser => {
              // Lưu thông tin người dùng đầy đủ vào localStorage
              localStorage.setItem('loggedInUser', JSON.stringify(fullUser));

              alert('Đăng nhập thành công!');

              // Check the role of the logged-in user and navigate accordingly
              if (fullUser.vaiTro === 'Quản Trị Viên') {
                this.router.navigate(['/admin/dashboard']);
              } else {
                this.router.navigate(['/user/trang-chu']);
              }

              this.dialogRef.close(fullUser);
            },
            error => {
              console.error('Error getting user details:', error);
              this.loginError = 'Đã xảy ra lỗi khi lấy thông tin người dùng.';
            }
          );
        } else {
          // Incorrect username or password
          this.loginError = 'Đăng nhập thất bại. Sai tên đăng nhập hoặc mật khẩu.';
        }
      },
      error => {
        console.error('Error getting users:', error);
        this.loginError = 'Đã xảy ra lỗi khi lấy danh sách người dùng.';
      }
    );
  }

  showForgotPassword() {
    this.isLoginVisible = false;
    this.isSignUpVisible = false;
  }

  showSignUpForm() {
    this.isSignUpVisible = true;
    this.isLoginVisible = false;
  }

  showLoginForm() {
    this.isLoginVisible = true;
    this.isSignUpVisible = false;
  }
}
