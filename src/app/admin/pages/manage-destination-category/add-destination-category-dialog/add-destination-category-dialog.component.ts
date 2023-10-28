import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DestinationCategory, DestinationCategoryService } from 'src/app/admin/services/destination-category.service';

@Component({
  selector: 'app-add-destination-category-dialog',
  templateUrl: './add-destination-category-dialog.component.html',
  styleUrls: ['./add-destination-category-dialog.component.css']
})
export class AddDestinationCategoryDialogComponent {
  newCategory: DestinationCategory;
  isInputEmpty: boolean = false;
  isDuplicateName: boolean = false;
  existingCategories!: DestinationCategory[]; // Danh sách danh mục từ cơ sở dữ liệu

  constructor(
    public dialogRef: MatDialogRef<AddDestinationCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      category: DestinationCategory,
    },
    private categoryService: DestinationCategoryService // Đối tượng dịch vụ danh mục
  ) {
    this.newCategory = { ...this.data.category };
    this.loadExistingCategories();
  }

  loadExistingCategories(): void {
    this.categoryService.getAllDestinationCategories().subscribe((categories: DestinationCategory[]) => {
      this.existingCategories = categories;
      console.log('Danh sách danh mục từ cơ sở dữ liệu:', this.existingCategories);
    });
  }
  

  saveChanges(): void {
    if (this.newCategory.tenDanhMuc.trim() === '') {
      this.isInputEmpty = true;
    } else {
      if (this.isDuplicateCategory(this.newCategory)) {
        this.isInputEmpty = false;
        this.isDuplicateName = true;
      } else {
        this.isInputEmpty = false;
        this.isDuplicateName = false;
        this.dialogRef.close(this.newCategory);
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Hàm kiểm tra trùng tên danh mục
  isDuplicateCategory(newCategory: DestinationCategory): boolean {
    const normalizedNewCategoryName = newCategory.tenDanhMuc.toLowerCase();
    return this.existingCategories.some(category => category.tenDanhMuc.toLowerCase() === normalizedNewCategoryName);
  }
}
