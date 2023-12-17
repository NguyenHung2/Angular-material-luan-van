import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListPost } from 'src/app/admin/services/list-post.service';

@Component({
  selector: 'app-delete-list-dialog',
  templateUrl: './delete-list-dialog.component.html',
  styleUrls: ['./delete-list-dialog.component.css']
})
export class DeleteListDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: ListPost, existingCategories: ListPost[] },
    private snackBar: MatSnackBar
  ) { }

  confirmDelete(): void {
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

  cancelDelete(): void {
    // Đóng dialog mà không thực hiện xóa.
    this.dialogRef.close(false);
  }
}
