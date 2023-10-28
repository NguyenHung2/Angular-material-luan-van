import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DestinationCategory } from 'src/app/admin/services/destination-category.service';

@Component({
  selector: 'app-delete-destination-category-dialog',
  templateUrl: './delete-destination-category-dialog.component.html',
  styleUrls: ['./delete-destination-category-dialog.component.css']
})
export class DeleteDestinationCategoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDestinationCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: DestinationCategory, existingCategories: DestinationCategory[] }
  ) {}

  confirmDelete(): void {
    // Thực hiện xóa danh mục ở đây, sau khi xóa, cập nhật danh sách existingCategories
    // Ví dụ: this.data.existingCategories = this.data.existingCategories.filter(cat => cat.maDanhMuc !== this.data.category.maDanhMuc);
    // Sau khi xóa, cập nhật danh sách existingCategories và đóng dialog
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    // Đóng dialog mà không thực hiện xóa.
    this.dialogRef.close(false);
  }
}
