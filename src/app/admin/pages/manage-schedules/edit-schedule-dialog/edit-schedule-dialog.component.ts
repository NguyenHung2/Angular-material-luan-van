import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from 'src/app/admin/services/schedule.service';
import { UserService } from 'src/app/admin/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-schedule-dialog',
  templateUrl: './edit-schedule-dialog.component.html',
  styleUrls: ['./edit-schedule-dialog.component.css']
})
export class EditScheduleDialogComponent implements OnInit {
  editScheduleForm: FormGroup;
  users: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.editScheduleForm = this.formBuilder.group({
      maLichTrinh: data.schedule.maLichTrinh,
      tieuDe: [data.schedule.tieuDe, Validators.required],
      moTa: [data.schedule.moTa],
      ngayBatDau: [data.schedule.ngayBatDau],
      ngayKetThuc: [data.schedule.ngayKetThuc],
      soLuongDiemDenToiDa: data.schedule.soLuongDiemDenToiDa,
      soNgayThamQuan: data.schedule.soNgayThamQuan.toString(), // Convert to string
      maNguoiDung: data.schedule.nguoiDung.maNguoiDung,
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.snackBar.open(
      'Người dùng đã được cập nhật thành công!',
      'Đóng',
      {
        duration: 3000,
        panelClass: 'success-snackbar',
      }
    );
  }

  onSaveClick(): void {
    if (this.editScheduleForm && this.editScheduleForm.valid) {
      const updatedSchedule: Schedule = this.editScheduleForm.value;
      this.dialogRef.close(updatedSchedule);
    }
  }
}
