import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinationCategoryService } from '../../service/destination-category.service';
import { DestinationCategory } from '../../models/destination-cateroty';

@Component({
  selector: 'app-manage-destination-category',
  templateUrl: './manage-destination-category.component.html',
  styleUrls: ['./manage-destination-category.component.css'],
})
export class ManageDestinationCategoryComponent implements OnInit {
  categories: DestinationCategory[] = [];
  searchControl = new FormControl('');
  filteredCategories: DestinationCategory[] = this.categories;
  displayedColumns: string[] = ['maDanhMuc', 'tenDanhMuc', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newCategoryForm!: FormGroup;
  newCategory: DestinationCategory = {
    maDanhMuc: 0,
    tenDanhMuc: '',
  };

  constructor(private categoryService: DestinationCategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCategories();

    this.newCategoryForm = this.fb.group({
      maDanhMuc: ['', Validators.required],
      tenDanhMuc: ['', Validators.required],
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(
      (data: DestinationCategory[]) => {
        this.categories = data;
        this.filteredCategories = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredCategories = this.categories.filter((category) =>
      category.maDanhMuc.toString().toLowerCase().includes(filterValue) ||
      category.tenDanhMuc.toLowerCase().includes(filterValue)
    );
  }

  editCategory(category: DestinationCategory): void {
    this.categoryService.updateCategory(category.maDanhMuc, category).subscribe(
      (editedCategory: any) => {
        const index = this.categories.findIndex((c) => c.maDanhMuc === editedCategory.maDanhMuc);
        if (index !== -1) {
          this.categories[index] = editedCategory;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }  

  deleteCategory(category: DestinationCategory): void {
    this.categoryService.deleteCategory(category.maDanhMuc).subscribe(() => {
      this.categories = this.categories.filter((c) => c.maDanhMuc !== category.maDanhMuc);
    });
  }

  addCategory() {
    if (this.newCategoryForm.valid) {
      // Create a new category and add it to the list
      const newCategory: DestinationCategory = {
        maDanhMuc: this.newCategoryForm.value.maDanhMuc,
        tenDanhMuc: this.newCategoryForm.value.tenDanhMuc,
      };

      this.categoryService.addDestinationCategory(newCategory).subscribe(
        (addedCategory: any) => {
          this.categories.push(addedCategory);
      
          // Reset form and hide it
          this.resetForm();
        },
        (error: any) => {
          console.log(error);
        }
      );      
    }
  }

  cancelAddForm() {
    this.resetForm();
  }

  resetForm() {
    this.newCategoryForm.reset();
    this.showAddFormFlag = false;
  }

  showAddForm() {
    this.showAddFormFlag = true;
  }
}
