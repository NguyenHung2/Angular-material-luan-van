import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from 'src/app/admin/services/activity.service';
import { Destination } from 'src/app/admin/services/destination.service';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.css']
})
export class AddActivityDialogComponent {
  newActivity: Activity = {
    maHoatDong: 0,
    tenHoatDong: '',
    thoiGianBatDau: new Date(),
    thoiGianKetThuc: new Date(),
    maDiemDen: 0,
    // Add other properties as needed
  };
  isInputEmpty: boolean = false;
  isInvalidTime: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      activity: Activity,
      destinations: Destination[],
    },
  ) {
    console.log('Constructor of AddActivityDialogComponent is called.');
    console.log('Data passed to the dialog: ', this.data);
    console.log('Danh sách điểm đến:', this.data.destinations);
  }

  saveChanges(): void {
    if (this.validateForm()) {
      this.dialogRef.close(this.newActivity);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  validateForm(): boolean {
    this.isInputEmpty = false;
    this.isInvalidTime = false;

    // Validate your form fields here
    if (!this.newActivity.tenHoatDong.trim()) {
      this.isInputEmpty = true;
      return false;
    }

    // Add additional validation as needed

    return true;
  }
}
