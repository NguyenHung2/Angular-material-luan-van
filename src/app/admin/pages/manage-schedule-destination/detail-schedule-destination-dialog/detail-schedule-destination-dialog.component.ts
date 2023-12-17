import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-schedule-destination-dialog',
  templateUrl: './detail-schedule-destination-dialog.component.html',
  styleUrls: ['./detail-schedule-destination-dialog.component.css']
})
export class DetailScheduleDestinationDialogComponent implements OnInit {
  detailScheduleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DetailScheduleDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.detailScheduleForm = this.formBuilder.group({
      maLichTrinhDiemDen: data.destination.maLichTrinhDiemDen,
      maLichTrinh: data.destination.lichTrinh.maLichTrinh,
      tenLichTrinh: data.destination.lichTrinh.tieuDe,
      maDiemDen: data.destination.diemDen.maDiemDen,
      tenDiemDen: data.destination.diemDen.tenDiemDen,
      thuTu: data.destination.thuTu,
      hoatDong: data.destination.hoatDong,
    });
  }

  ngOnInit(): void {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
