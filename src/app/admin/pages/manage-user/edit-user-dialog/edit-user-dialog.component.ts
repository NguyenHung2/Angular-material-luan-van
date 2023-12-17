// edit-user-dialog/edit-user-dialog.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  newUser: User; // Declare newUser to store the edited user data

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private snackBar: MatSnackBar
  ) {
    this.newUser = { ...data.user };
  }

  saveChanges(): void {
    this.dialogRef.close(this.newUser);
    this.snackBar.open(
      'Người dùng đã được cập nhật thành công!',
      'Đóng',
      {
        duration: 3000,
        panelClass: 'success-snackbar',
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  isUserDataValid(): boolean {
    if (!this.newUser.tenNguoiDung || this.newUser.tenNguoiDung.trim() === '') {
      return false;
    }

    if (!this.newUser.email || !this.isValidEmail(this.newUser.email)) {
      return false;
    }

    if (!this.newUser.matKhau || this.newUser.matKhau.trim() === '') {
      return false;
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  }

  passwordFieldType: string = 'password';
  passwordVisibilityIcon: string = 'visibility';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordVisibilityIcon = this.passwordVisibilityIcon === 'visibility' ? 'visibility_off' : 'visibility';
  }
}
