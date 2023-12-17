import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Output() backToLogin: EventEmitter<any> = new EventEmitter();
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  hideNewPassword: boolean = true;
  hideConfirmNewPassword: boolean = true;
  phoneNumberError: string | null = null;
  passwordError: string | null = null;
  passwordMismatchError: string | null = null;

  constructor(private userService: UserService) { }

  resetPassword() {
    this.phoneNumberError = null;
    this.passwordError = null;
    this.passwordMismatchError = null;

    if (!this.phoneNumber) {
      this.phoneNumberError = 'Vui lòng nhập số điện thoại.';
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
            if (exists) {
              // Phone number exists, proceed to update password
              this.userService.updatePasswordByPhoneNumber(this.phoneNumber, this.password).subscribe(
                result => {
                  console.log('Password updated successfully:', result);
                  alert('Mật khẩu đã được cập nhật thành công!');
                  // Additional actions after successful password update if needed
                  this.showLogin();
                },
                error => {
                  console.error('Error updating password:', error);
                  this.phoneNumberError = 'Đã xảy ra lỗi khi cập nhật mật khẩu.';
                }
              );
            } else {
              this.phoneNumberError = 'Số điện thoại không tồn tại.';
            }
          },
          error => {
            console.error('Error checking phone number:', error);
            this.phoneNumberError = 'Đã xảy ra lỗi khi kiểm tra số điện thoại.';
          }
        );
      }
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
  }

  showLogin() {
    this.backToLogin.emit();
  }

  toggleShowHidePassword(field: string) {
    // Toggle the visibility of the password based on the field
    if (field === 'newPassword') {
      this.hideNewPassword = !this.hideNewPassword;
    } else if (field === 'confirmNewPassword') {
      this.hideConfirmNewPassword = !this.hideConfirmNewPassword;
    }
  }
}
