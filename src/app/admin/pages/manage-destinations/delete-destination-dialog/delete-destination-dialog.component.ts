// delete-destination-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Destination } from 'src/app/admin/services/destination.service';

@Component({
  selector: 'app-delete-destination-dialog',
  templateUrl: './delete-destination-dialog.component.html',
  styleUrls: ['./delete-destination-dialog.component.css']
})
export class DeleteDestinationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { destination: Destination },
    private snackBar: MatSnackBar
    ) {}

  confirmDeletion(): void {
    this.dialogRef.close(true); 
    this.snackBar.open(
      'Người dùng đã được xóa thành công!',
      'Đóng',
      {
        duration: 3000,
        panelClass: 'success-snackbar',
      }
    );
  }

  cancelDeletion(): void {
    this.dialogRef.close(false); // Signal to the parent component that deletion is canceled
  }
}
