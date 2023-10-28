import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListPost } from 'src/app/admin/services/list-post.service';

@Component({
  selector: 'app-delete-list-dialog',
  templateUrl: './delete-list-dialog.component.html',
  styleUrls: ['./delete-list-dialog.component.css']
})
export class DeleteListDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: ListPost, existingCategories: ListPost[] }
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
