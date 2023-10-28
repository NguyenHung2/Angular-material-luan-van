import { ListPost, ListPostService } from './../../services/list-post.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { EditListDialogComponent } from './edit-list-dialog/edit-list-dialog.component';
import { DeleteListDialogComponent } from './delete-list-dialog/delete-list-dialog.component';

@Component({
  selector: 'app-manage-list-posts',
  templateUrl: './manage-list-posts.component.html',
  styleUrls: ['./manage-list-posts.component.css']
})

export class ManageListPostsComponent implements OnInit {
  listPost: ListPost[] = [];
  searchControl = new FormControl('');
  filteredlistPost: MatTableDataSource<ListPost> = new MatTableDataSource<ListPost>(this.listPost);
  displayedColumns: string[] = ['maLoai', 'tenLoai', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newCategory: ListPost = {
    maLoai: 0,
    tenLoai: '',
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: ListPostService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngAfterViewInit() {
    this.filteredlistPost.sort = this.sort;
    this.filteredlistPost.paginator = this.paginator;
  }

  loadCategories() {
    this.categoryService.getAllListPost().subscribe((data) => {
      this.listPost = data;
      this.filteredlistPost = new MatTableDataSource<ListPost>(this.listPost);

      this.filteredlistPost.sort = this.sort;
      this.filteredlistPost.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredlistPost.filter = filterValue;
  }

  showEditForm(category: ListPost): void {
    const dialogRef = this.dialog.open(EditListDialogComponent, {
      data: { category, existingCategories: this.listPost }
    });

    dialogRef.afterClosed().subscribe((editedCategory: ListPost) => {
      if (editedCategory) {
        this.categoryService.updateListPost(editedCategory.maLoai, editedCategory).subscribe(
          (updatedCategory: ListPost) => {
            this.loadCategories();
          },
          (error) => {
            console.error('Lỗi khi cập nhật danh mục:', error);
          }
        );
      }
    });
  }

  showDeleteForm(category: ListPost): void {
    const dialogRef = this.dialog.open(DeleteListDialogComponent, {
      data: { category }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.categoryService.deleteListPost(category.maLoai).subscribe(
          () => {
            this.loadCategories();
          },
          (error) => {
            console.error('Failed to delete category:', error);
          }
        );
      }
    });
  }

  addCategory() {
    this.categoryService.createListPost(this.newCategory).subscribe(
      (newCategory: ListPost) => {
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
    this.newCategory = { maLoai: 0, tenLoai: '' };
    this.showAddFormFlag = false;
  }

  showAddForm() {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      data: {
        category: this.newCategory,
        existingCategories: this.listPost,
      },
    });

    dialogRef.afterClosed().subscribe((addedCategory: ListPost) => {
      if (addedCategory) {
        this.categoryService.createListPost(addedCategory).subscribe(
          (newCategory: ListPost) => {
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
