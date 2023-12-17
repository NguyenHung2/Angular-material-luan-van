import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-schedule-destination-dialog',
  templateUrl: './delete-schedule-destination-dialog.component.html',
  styleUrls: ['./delete-schedule-destination-dialog.component.css']
})
export class DeleteScheduleDestinationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteScheduleDestinationDialogComponent>,
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
