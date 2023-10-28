import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DestinationCategory, DestinationCategoryService } from '../../services/destination-category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddDestinationCategoryDialogComponent } from './add-destination-category-dialog/add-destination-category-dialog.component';
import { EditDestinationCategoryDialogComponent } from './edit-destination-category-dialog/edit-destination-category-dialog.component';
import { DeleteDestinationCategoryDialogComponent } from './delete-destination-category-dialog/delete-destination-category-dialog.component';

@Component({
  selector: 'app-manage-destination-category',
  templateUrl: './manage-destination-category.component.html',
  styleUrls: ['./manage-destination-category.component.css']
})
export class ManageDestinationCategoryComponent implements OnInit {
  destinationCategories: DestinationCategory[] = [];
  searchControl = new FormControl('');
  filteredDestinationCategories: MatTableDataSource<DestinationCategory> = new MatTableDataSource<DestinationCategory>(this.destinationCategories);
  displayedColumns: string[] = ['maDanhMuc', 'tenDanhMuc', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newCategory: DestinationCategory = {
    maDanhMuc: null,
    tenDanhMuc: '',
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: DestinationCategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngAfterViewInit() {
    this.filteredDestinationCategories.sort = this.sort;
    this.filteredDestinationCategories.paginator = this.paginator;
  }

  loadCategories() {
    this.categoryService.getAllDestinationCategories().subscribe((data) => {
      this.destinationCategories = data;
      this.filteredDestinationCategories = new MatTableDataSource<DestinationCategory>(this.destinationCategories);

      this.filteredDestinationCategories.sort = this.sort;
      this.filteredDestinationCategories.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredDestinationCategories.filter = filterValue;
  }

  showEditForm(category: DestinationCategory): void {
    const dialogRef = this.dialog.open(EditDestinationCategoryDialogComponent, {
      data: { category, existingCategories: this.destinationCategories }
    });

    dialogRef.afterClosed().subscribe((editedCategory: DestinationCategory) => {
      if (editedCategory.maDanhMuc !== null) {
        this.categoryService.updateDestinationCategory(editedCategory.maDanhMuc, editedCategory).subscribe(
          (updatedCategory: DestinationCategory) => {
            this.loadCategories();
          },
          (error) => {
            console.error('Lỗi khi cập nhật danh mục:', error);
          }
        );
      }
    });
  }

  showDeleteForm(category: DestinationCategory): void {
    if (category.maDanhMuc !== null) {
      const dialogRef = this.dialog.open(DeleteDestinationCategoryDialogComponent, {
        data: { category }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.categoryService.deleteDestinationCategory(category.maDanhMuc as number).subscribe(
            () => {
              this.loadCategories();
            },
            (error) => {
              console.error('Failed to delete category:', error);
            }
          );
        }
      });
    } else {
      // Handle the case where `destination.maDiemDen` is `null`.
    }
  }


  addCategory() {
    this.categoryService.createDestinationCategory(this.newCategory).subscribe(
      (newCategory: DestinationCategory) => {
        this.resetForm();
        this.loadCategories();
      },
      (error) => {
        console.error('Failed to add new category:', error);
      }
    );
  }

  cancelAddForm() {
    this.resetForm();
  }

  resetForm() {
    this.newCategory = { maDanhMuc: 0, tenDanhMuc: '' };
    this.showAddFormFlag = false;
  }

  showAddForm() {
    const dialogRef = this.dialog.open(AddDestinationCategoryDialogComponent, {
      data: {
        category: this.newCategory,
        existingCategories: this.destinationCategories,
      },
    });

    dialogRef.afterClosed().subscribe((addedCategory: DestinationCategory) => {
      if (addedCategory) {
        this.categoryService.createDestinationCategory(addedCategory).subscribe(
          (newCategory: DestinationCategory) => {
            this.loadCategories(); // Cập nhật danh sách sau khi thêm
            this.resetForm(); // Đặt lại trạng thái form thêm
          },
          (error) => {
            console.error('Failed to add new category:', error);
          }
        );
      }
    });
  }
}
