import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-user-dialog',
  templateUrl: './detail-user-dialog.component.html',
  styleUrls: ['./detail-user-dialog.component.css']
})
export class DetailUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // In dữ liệu từ biến data ra console
    console.log('Dữ liệu trong biến data:', this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
