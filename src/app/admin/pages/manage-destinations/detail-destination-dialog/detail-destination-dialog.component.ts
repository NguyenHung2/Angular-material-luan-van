import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-destination-dialog',
  templateUrl: './detail-destination-dialog.component.html',
  styleUrls: ['./detail-destination-dialog.component.css']
})
export class DetailDestinationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // In dữ liệu từ biến data ra console
    console.log('Dữ liệu trong biến data:', this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
