import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-post-dialog',
  templateUrl: './detail-post-dialog.component.html',
  styleUrls: ['./detail-post-dialog.component.css']
})
export class DetailPostDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
