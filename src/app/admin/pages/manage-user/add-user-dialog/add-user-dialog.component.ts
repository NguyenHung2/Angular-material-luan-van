import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserService } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
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

  isInputEmpty: boolean = false;
  isDuplicatePhoneNumber: boolean = false;
  isPasswordTooShort: boolean = false;
  isPhoneNumberValid: boolean = false;
  phonePattern = /^0\d{9,10}$/;
  hidePassword: boolean = true;
  isInvalidEmail = false;
  isDuplicateEmail = false;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newUser.gioiTinh = 'Nam';
    this.newUser.vaiTro = 'Người Dùng';
  }

  saveChanges(): void {
    // Check if the username, phone number, or password is empty
    if (
      this.newUser.tenNguoiDung.trim() === '' ||
      this.newUser.soDienThoai.trim() === '' ||
      this.newUser.matKhau.trim() === ''
    ) {
      this.isInputEmpty = true;
      return;
    }

    // Trim whitespaces
    const phoneNumber = this.newUser.soDienThoai.trim();

    // Check if the phone number is NOT valid
    if (!this.phonePattern.test(phoneNumber)) {
      this.isInputEmpty = false;
      this.isPhoneNumberValid = true;
      this.isInvalidEmail = false;
      return;
    }

    // Check if the password is too short
    if (this.newUser.matKhau.length < 8) {
      this.isInputEmpty = false;
      this.isPhoneNumberValid = false;
      this.isPasswordTooShort = true;
      this.isInvalidEmail = false;
      return;
    }

    // Check if the email is not null and is a valid Gmail address
    if (
      this.newUser.email !== null &&
      this.newUser.email.trim() !== '' &&
      !this.isValidGmailAddress(this.newUser.email)
    ) {
      this.isInputEmpty = false;
      this.isPhoneNumberValid = false;
      this.isPasswordTooShort = false;
      this.isInvalidEmail = true;
      return;
    }

    // Check if the phone number already exists
    this.userService.checkPhoneNumberExists(phoneNumber).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.isDuplicatePhoneNumber = true;
        } else {
          // Call the user service to add the new user
          this.userService.addUser(this.newUser).subscribe(
            (addedUser: User) => {
              this.dialogRef.close(addedUser);
              this.snackBar.open(
                'Người dùng đã được thêm thành công!',
                'Đóng',
                {
                  duration: 3000,
                  panelClass: 'success-snackbar',
                }
              );
            },
            (error) => {
              console.error('Error adding user:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error checking phone number:', error);
      }
    );
  }

  // Function to check if the email is a valid Gmail address
  isValidGmailAddress(email: string): boolean {
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }


  closeDialog(): void {
    this.dialogRef.close(null);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
