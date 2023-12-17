// detail-schedule-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-schedule-dialog',
  templateUrl: './detail-schedule-dialog.component.html',
  styleUrls: ['./detail-schedule-dialog.component.css']
})
export class DetailScheduleDialogComponent implements OnInit {
  detailScheduleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DetailScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.detailScheduleForm = this.formBuilder.group({
      tieuDe: data.schedule.tieuDe,
      moTa: data.schedule.moTa,
      ngayBatDau: data.schedule.ngayBatDau,
      ngayKetThuc: data.schedule.ngayKetThuc,
      soLuongDiemDenToiDa: data.schedule.soLuongDiemDenToiDa,
      soNgayThamQuan: data.schedule.soNgayThamQuan,
      maNguoiDung: data.schedule.nguoiDung.maNguoiDung,
      tenNguoiDung: data.schedule.nguoiDung.tenNguoiDung
    });
  }

  ngOnInit(): void {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
