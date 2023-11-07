import { Component, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from 'src/app/admin/services/schedule.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { UserService } from 'src/app/admin/services/user.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-schedule-dialog',
  templateUrl: './add-schedule-dialog.component.html',
  styleUrls: ['./add-schedule-dialog.component.css']
})
export class AddScheduleDialogComponent implements OnInit {
  addScheduleForm: FormGroup;
  selectedKinhDoXuatPhat: number = 0;
  selectedViDoXuatPhat: number = 0;
  users: any[] = [];

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  private map!: L.Map;

  constructor(
    public dialogRef: MatDialogRef<AddScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.addScheduleForm = this.formBuilder.group({
      maLichTrinh: 0,
      tieuDe: ['', Validators.required],
      moTa: [''],
      maNguoiDung: 0,
      kinhDoXuatPhat: [this.selectedKinhDoXuatPhat, Validators.required],
      viDoXuatPhat: [this.selectedViDoXuatPhat, Validators.required],
      soLuongDiemDenToiDa: 5
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
      newSchedule.kinhDoXuatPhat = this.selectedKinhDoXuatPhat;
      newSchedule.viDoXuatPhat = this.selectedViDoXuatPhat;
      this.dialogRef.close(newSchedule);
      console.log(newSchedule)
    }
  }

  openMapDialog(): void {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: '600px',
      data: { selectedKinhDo: this.selectedKinhDoXuatPhat, selectedViDo: this.selectedViDoXuatPhat }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedKinhDoXuatPhat = result.kinhDo;
        this.selectedViDoXuatPhat = result.viDo;
        if (this.addScheduleForm) {
          this.addScheduleForm.get('kinhDoXuatPhat')?.setValue(this.selectedKinhDoXuatPhat);
          this.addScheduleForm.get('viDoXuatPhat')?.setValue(this.selectedViDoXuatPhat);
        }
      }
    });
  }  

  onDateInput(event: any, formControlName: string): void {
    if (event) {
      this.addScheduleForm.get(formControlName)?.setValue(event.value);
    }
  }
}