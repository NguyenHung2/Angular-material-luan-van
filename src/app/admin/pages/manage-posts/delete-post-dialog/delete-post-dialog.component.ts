import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-post-dialog',
  templateUrl: './delete-post-dialog.component.html',
  styleUrls: ['./delete-post-dialog.component.css']
})
export class DeletePostDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
    this.snackBar.open(
      'Người dùng đã được xóa thành công!',
      'Đóng',
      {
        duration: 3000,
        panelClass: 'success-snackbar',
      }
    );
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}