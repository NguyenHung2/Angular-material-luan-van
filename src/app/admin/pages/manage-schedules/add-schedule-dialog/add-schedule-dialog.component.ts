import { Component, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from 'src/app/admin/services/schedule.service';
import { UserService } from 'src/app/admin/services/user.service';
import * as L from 'leaflet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-schedule-dialog',
  templateUrl: './add-schedule-dialog.component.html',
  styleUrls: ['./add-schedule-dialog.component.css']
})
export class AddScheduleDialogComponent implements OnInit {
  addScheduleForm: FormGroup;
  users: any[] = [];

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  private map!: L.Map;

  constructor(
    public dialogRef: MatDialogRef<AddScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.addScheduleForm = this.formBuilder.group({
      maLichTrinh: 0,
      tieuDe: ['', Validators.required],
      moTa: [''],
      ngayBatDau: new Date(),
      ngayKetThuc: new Date(),
      soLuongDiemDenToiDa: 5,
      soNgayThamQuan: '1', // Giá trị mặc định là 1 ngày
      maNguoiDung: 0,
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data; // Lưu danh sách người dùng khi nó được tải
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.addScheduleForm && this.addScheduleForm.valid) {
      const newSchedule: Schedule = this.addScheduleForm.value;
      this.dialogRef.close(newSchedule);
      console.log(newSchedule);
      this.snackBar.open(
        'Người dùng đã được thêm thành công!',
        'Đóng',
        {
          duration: 3000,
          panelClass: 'success-snackbar',
        }
      );
    }
  }

  onDateInput(event: any, formControlName: string): void {
    if (event) {
      this.addScheduleForm.get(formControlName)?.setValue(event.value);
    }
  }
}
