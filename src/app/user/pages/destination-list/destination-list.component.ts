import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DestinationCategory, DestinationCategoryService } from 'src/app/services/destination-category.service';
import { Destination, DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {
  // Sidebar
  sidenavOpen = true;
  availableCategories: DestinationCategory[] = [];

  // Filters
  selectedCategories: { [key: string]: boolean } = {};
  noResultsFound: boolean = false;

  // Pagination
  itemsPerPage: number = 6;
  totalDestinations: number = 0;
  pageIndex: number = 0;

  // Destinations
  destinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  displayedDestinations: Destination[] = [];

  categoryNameMap: { [key: string]: string } = {}; // Category ID to Name mapping

  constructor(
    private destinationService: DestinationService,
    private categoryService: DestinationCategoryService
  ) { }

  ngOnInit() {
    this.loadDestinations();
    this.loadCategories();
    this.sidenavOpen = !this.isScreenSmall();
    window.addEventListener('resize', () => {
      this.sidenavOpen = !this.isScreenSmall();
    });

    this.applyFilters();
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  loadDestinations() {
    this.destinationService.getDestinations().subscribe((destinations) => {
      this.destinations = destinations;
      this.filteredDestinations = destinations; // Initialize filteredDestinations with all destinations
      this.totalDestinations = destinations.length;
      this.updateDisplayedDestinations(this.pageIndex);
    });
  }
  

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.availableCategories = categories;
      for (const category of categories) {
        this.categoryNameMap[category.maDanhMuc.toString()] = category.tenDanhMuc;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.updateDisplayedDestinations(this.pageIndex);
  }

  updateDisplayedDestinations(pageIndex: number) {
    const startIndex = pageIndex * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedDestinations = this.filteredDestinations.slice(startIndex, endIndex);
  }

  applyFilters() {
    const selectedCategoryIds = Object.keys(this.selectedCategories)
      .filter((key) => this.selectedCategories[key])
      .map(Number); // Convert the category IDs back to numbers if needed
  
    if (selectedCategoryIds.length === 0) {
      this.filteredDestinations = this.destinations; // No categories selected, display all destinations
    } else {
      this.filteredDestinations = this.destinations.filter((destination) =>
        selectedCategoryIds.includes(destination.maDanhMuc)
      );
    }
  
    this.noResultsFound = this.filteredDestinations.length === 0;
    this.updateDisplayedDestinations(this.pageIndex);
  }
  
  showDetails(destination: Destination) {
    // Implement the logic to show details for a specific destination
  }

  isScreenSmall(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width <= 1200;
  }

  selectedCategory: string | null = null;

  onCategorySelected(selectedCategory: string) {
    if (this.selectedCategory === selectedCategory) {
      this.selectedCategories[selectedCategory] = false;
      this.selectedCategory = null;
    } else {
      this.selectedCategory = selectedCategory;
      for (const key of Object.keys(this.selectedCategories)) {
        if (key !== selectedCategory) {
          this.selectedCategories[key] = false;
        }
      }
    }
    this.applyFilters();
  }   
}
