import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListPost, ListPostService } from 'src/app/admin/services/list-post.service';

@Component({
  selector: 'app-edit-list-dialog',
  templateUrl: './edit-list-dialog.component.html',
  styleUrls: ['./edit-list-dialog.component.css']
})
export class EditListDialogComponent {
  editedCategory: ListPost;
  isInputEmpty: boolean = false;
  isDuplicateName: boolean = false;
  existingCategories!: ListPost[]; // Danh sách danh mục từ cơ sở dữ liệu

  constructor(
    public dialogRef: MatDialogRef<EditListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      category: ListPost,
      existingCategories: ListPost[]
    },
    private snackBar: MatSnackBar,
    private listService: ListPostService // Đối tượng dịch vụ danh mục
  ) {
    this.editedCategory = { ...this.data.category };
    this.existingCategories = this.data.existingCategories;
  }

  saveChanges(): void {
    this.isInputEmpty = false;
    this.isDuplicateName = false;

    if (this.editedCategory.tenLoai.trim() === '') {
      this.isInputEmpty = true;
    } else {
      if (this.isDuplicateCategory(this.editedCategory)) {
        this.isDuplicateName = true;
      } else {
        this.dialogRef.close(this.editedCategory);
        this.snackBar.open(
          'Người dùng đã được cập nhật thành công!',
          'Đóng',
          {
            duration: 3000,
            panelClass: 'success-snackbar',
          }
        );
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Hàm kiểm tra trùng tên danh mục
  isDuplicateCategory(newCategory: ListPost): boolean {
    const normalizedNewCategoryName = newCategory && newCategory.tenLoai ? newCategory.tenLoai.toLowerCase() : '';
    return this.existingCategories.some(category => category.tenLoai && category.tenLoai.toLowerCase() === normalizedNewCategoryName);
  }  
}