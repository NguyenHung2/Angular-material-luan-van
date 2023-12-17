import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListPost, ListPostService } from 'src/app/admin/services/list-post.service';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.css']
})
export class AddListDialogComponent {
  newCategory: ListPost;
  isInputEmpty: boolean = false;
  isDuplicateName: boolean = false;
  existingCategories!: ListPost[]; // Danh sách danh mục từ cơ sở dữ liệu

  constructor(
    public dialogRef: MatDialogRef<AddListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      category: ListPost,
    },
    private snackBar: MatSnackBar,
    private categoryService: ListPostService // Đối tượng dịch vụ danh mục
  ) {
    this.newCategory = { ...this.data.category };
    this.loadExistingCategories();
  }

  loadExistingCategories(): void {
    this.categoryService.getAllListPost().subscribe((categories: ListPost[]) => {
      this.existingCategories = categories;
      console.log('Danh sách danh mục từ cơ sở dữ liệu:', this.existingCategories);
    });
  }
  

  saveChanges(): void {
    if (this.newCategory.tenLoai.trim() === '') {
      this.isInputEmpty = true;
    } else {
      if (this.isDuplicateCategory(this.newCategory)) {
        this.isInputEmpty = false;
        this.isDuplicateName = true;
      } else {
        this.isInputEmpty = false;
        this.isDuplicateName = false;
        this.dialogRef.close(this.newCategory);
        this.snackBar.open(
          'Người dùng đã được thêm thành công!',
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