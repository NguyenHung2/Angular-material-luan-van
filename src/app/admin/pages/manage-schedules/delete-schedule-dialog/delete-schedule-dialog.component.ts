// delete-schedule-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-schedule-dialog',
  templateUrl: './delete-schedule-dialog.component.html',
  styleUrls: ['./delete-schedule-dialog.component.css']
})
export class DeleteScheduleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  onCancelClick(): void {
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

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }
}
