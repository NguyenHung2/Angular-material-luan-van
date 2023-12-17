import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestinationCategory } from 'src/app/admin/services/destination-category.service';

@Component({
  selector: 'app-delete-destination-category-dialog',
  templateUrl: './delete-destination-category-dialog.component.html',
  styleUrls: ['./delete-destination-category-dialog.component.css']
})
export class DeleteDestinationCategoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDestinationCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: DestinationCategory, existingCategories: DestinationCategory[] },
    private snackBar: MatSnackBar
  ) {}

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
