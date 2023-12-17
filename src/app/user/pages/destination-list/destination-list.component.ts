import { Component, OnInit } from '@angular/core';
import { DestinationCategory, DestinationCategoryService } from 'src/app/admin/services/destination-category.service';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {
  pagedDestinations: Destination[] = [];
  page = 0;
  itemsPerPage = 6;
  totalItems = 0;
  destinations: Destination[] = [];
  categories: DestinationCategory[] = [];
  selectedCategory: DestinationCategory | null = null;
  allDestinations: Destination[] = [];

  constructor(
    private destinationService: DestinationService, 
    private categoryService: DestinationCategoryService
    ) { }

  ngOnInit() {
    this.loadCategories();
    this.categoryService.getAllDestinationCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = null; // No category selected initially
      this.loadAllDestinations(); // Load all destinations
    });
  }

  loadCategories() {
    this.categoryService.getAllDestinationCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadAllDestinations() {
    this.destinationService.getAllDestinations().subscribe(destinations => {
      this.allDestinations = destinations;
      this.totalItems = this.allDestinations.length;
      this.loadDestinations(); // Load all destinations
      console.log('Destination data loaded:', this.allDestinations);
    });
  }

  filterDestinationsByCategory(category: DestinationCategory | null) {
    this.selectedCategory = category;
    this.page = 0; // Go back to the first page when changing the category
  
    if (category) {
      this.totalItems = this.allDestinations.filter(dest => dest.danhMuc?.maDanhMuc === category.maDanhMuc).length;
    } else {
      this.totalItems = this.allDestinations.length; // No category selected case
    }
  
    this.loadDestinations();
  }
    

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.loadDestinations();
  }

  loadDestinations() {
    if (this.selectedCategory) {
      const filteredDestinations = this.allDestinations
        .filter(dest => dest.danhMuc?.maDanhMuc === this.selectedCategory!.maDanhMuc);

      if (filteredDestinations.length > 0) {
        this.pagedDestinations = filteredDestinations
          .slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage);
      } else {
        // No destinations matching the selected category
        this.pagedDestinations = [];
      }
    } else {
      this.pagedDestinations = this.allDestinations.slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage);
    }
  }
}
