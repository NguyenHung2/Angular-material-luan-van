// sign-up.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { User, UserService } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isLoginFormVisible: boolean = true;
  isSignUpVisible: boolean = false;
  fullName: string = '';
  email: string = '';
  gender: string = 'Nam';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  dateOfBirth: Date | null = null;
  role: string = 'Người Dùng';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Error messages
  fullNameError: string | null = null;
  emailError: string | null = null;
  phoneNumberError: string | null = null;
  passwordError: string | null = null;
  passwordMismatchError: string | null = null;
  dateOfBirthError: string | null = null;

  @Output() backToLogin: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService) { }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signUp() {
    // Reset error messages
    this.fullNameError = null;
    this.emailError = null;
    this.phoneNumberError = null;
    this.passwordError = null;
    this.passwordMismatchError = null;
    this.dateOfBirthError = null;

    // Validate inputs
    if (!this.fullName) {
      this.fullNameError = 'Vui lòng nhập họ và tên.';
    }

    if (!this.phoneNumber) {
      this.phoneNumberError = 'Vui lòng nhập số điện thoại.';
    }

    // Validate password only if it is not empty
    if (!this.password) {
      this.passwordError = 'Vui lòng nhập mật khẩu.';
    } else {
      // Perform additional password validation if it is not empty
      // Validate password length
      const MIN_PASSWORD_LENGTH = 8;
      if (this.password.length < MIN_PASSWORD_LENGTH) {
        this.passwordError = `Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự.`;
      }
    }

    if (this.password !== this.confirmPassword) {
      this.passwordMismatchError = 'Mật khẩu và xác nhận mật khẩu không khớp.';
    }

    if (!this.dateOfBirth) {
      this.dateOfBirthError = 'Vui lòng chọn ngày sinh.';
    }

    // Validate phone number format and check if it is not already in use
    if (this.phoneNumber) {
      const phoneRegex = /^0\d{9}$/; // Assumes a 10-digit phone number
      if (!phoneRegex.test(this.phoneNumber)) {
        this.phoneNumberError = 'Số điện thoại không hợp lệ.';
      } else {
        // Check if the phone number is already in use
        console.log('Checking phone number:', this.phoneNumber);
        this.userService.checkPhoneNumberExists(this.phoneNumber).subscribe(
          exists => {
            console.log('Phone number exists:', exists);
            if (exists) {
              this.phoneNumberError = 'Số điện thoại đã được sử dụng.';
            } else {
              // No errors, proceed with creating a new user
              this.createUser();
            }
          },
          error => {
            console.error('Error checking phone number:', error);
          }
        );
      }
    }

    // Validate email format only if it is not null
    if (this.email) {
      const emailRegex = /^[^\s@]+@gmail\.com$/; // Only allows email addresses with @gmail.com domain
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Địa chỉ email không hợp lệ vd: example@gmail.com.';
      } else {
        // Check if the email is already in use
        console.log('Checking email:', this.email);
        this.userService.checkEmailExists(this.email).subscribe(
          exists => {
            console.log('Email exists:', exists);
            if (exists) {
              this.emailError = 'Địa chỉ email đã được sử dụng.';
            } 
          },
          error => {
            console.error('Error checking email:', error);
          }
        );
      }
    }
  }

  private createUser() {
    // Create a new user object
    const newUser: User = {
      maNguoiDung: 0, // This will be generated by the server
      tenNguoiDung: this.fullName,
      email: this.email,
      gioiTinh: this.gender,
      diaChi: '',   // You can add address input if needed
      soDienThoai: this.phoneNumber,
      ngaySinh: this.dateOfBirth || new Date(),
      matKhau: this.password,
      vaiTro: this.role,
      ngayDangKy: new Date()
    };

    // Call the UserService to add the new user
    this.userService.addUser(newUser).subscribe(
      addedUser => {
        console.log('User registered successfully:', addedUser);
        alert('Đăng ký thành công!');
        // You can perform additional actions after successful registration if needed
        this.backToLogin.emit();
      },
      error => {
        console.error('Error registering user:', error);
        // Handle the error (e.g., show a message to the user)
      }
    );
  }

  showLoginForm() {
    this.isLoginFormVisible = true;
    this.isSignUpVisible = false;
  }
}
