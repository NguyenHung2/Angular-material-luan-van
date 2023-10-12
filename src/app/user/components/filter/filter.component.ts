import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  selectedLocation: string = '';
  selectedCategory: string = 'all';
  selectedSort: string = 'moi-nhat';

  @Output() filtersApplied = new EventEmitter<any>();

  applyFilters() {
    const filters = {
      location: this.selectedLocation,
      category: this.selectedCategory,
      sort: this.selectedSort
    };
    this.filtersApplied.emit(filters);
  }
}
