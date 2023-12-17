import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestinationCategory, DestinationCategoryService } from 'src/app/admin/services/destination-category.service';

@Component({
  selector: 'app-edit-destination-category-dialog',
  templateUrl: './edit-destination-category-dialog.component.html',
  styleUrls: ['./edit-destination-category-dialog.component.css']
})
export class EditDestinationCategoryDialogComponent {
  editedCategory: DestinationCategory;
  isInputEmpty: boolean = false;
  isDuplicateName: boolean = false;
  existingCategories!: DestinationCategory[]; // Danh sách danh mục từ cơ sở dữ liệu

  constructor(
    public dialogRef: MatDialogRef<EditDestinationCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      category: DestinationCategory,
      existingCategories: DestinationCategory[]
    },
    private snackBar: MatSnackBar,
    private categoryService: DestinationCategoryService // Đối tượng dịch vụ danh mục
  ) {
    this.editedCategory = { ...this.data.category };
    this.existingCategories = this.data.existingCategories;
  }

  saveChanges(): void {
    this.isInputEmpty = false;
    this.isDuplicateName = false;

    if (this.editedCategory.tenDanhMuc.trim() === '') {
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
  isDuplicateCategory(editedCategory: DestinationCategory): boolean {
    const normalizedEditedCategoryName = editedCategory.tenDanhMuc.toLowerCase();
    return this.existingCategories.some(category => category.tenDanhMuc.toLowerCase() === normalizedEditedCategoryName);
  }
}
