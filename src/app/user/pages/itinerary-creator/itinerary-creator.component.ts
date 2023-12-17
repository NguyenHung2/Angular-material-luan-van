import { Component, OnInit } from '@angular/core';
import { DestinationCategory, DestinationCategoryService } from 'src/app/admin/services/destination-category.service';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service';

@Component({
  selector: 'app-itinerary-creator',
  templateUrl: './itinerary-creator.component.html',
  styleUrls: ['./itinerary-creator.component.css']
})
export class ItineraryCreatorComponent implements OnInit {
  pagedItineraries: Destination[] = [];
  page = 0;
  itemsPerPage = 5;
  totalItineraries = 0;
  itineraries: Destination[] = [];
  tourTypes: DestinationCategory[] = [];
  selectedCategory: DestinationCategory | null = null;

  constructor(private destinationService: DestinationService, private destinationCategoryService: DestinationCategoryService) { }

  ngOnInit() {
    this.loadTourTypes();
    this.destinationCategoryService.getAllDestinationCategories().subscribe(categories => {
      this.tourTypes = categories;
      this.selectedCategory = null; // Không chọn loại hình nào ban đầu
      this.loadAllItineraries(); // Tải tất cả lịch trình
    });
  }

  loadTourTypes() {
    this.destinationCategoryService.getAllDestinationCategories().subscribe(categories => {
      this.tourTypes = categories;
    });
  }

  loadAllItineraries() {
    this.destinationService.getAllDestinations().subscribe(itineraries => {
      this.itineraries = itineraries;
      this.totalItineraries = this.itineraries.length;
      this.loadItineraries(); // Tải tất cả lịch trình
      console.log('Dữ liệu lịch trình đã được tải:', this.itineraries);
    });
  }

  filterItinerariesByCategory(category: DestinationCategory | null) {
    this.selectedCategory = category;
    this.page = 0; // Trở về trang đầu khi thay đổi loại hình

    if (category) {
      const categoryItineraries = this.itineraries.filter(itinerary => itinerary.maDanhMuc === category.maDanhMuc);
      this.totalItineraries = categoryItineraries.length;
    } else {
      this.totalItineraries = this.itineraries.length; // Trường hợp không có loại hình nào được chọn
    }

    this.loadItineraries();
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.loadItineraries();
  }

  loadItineraries() {
    if (this.selectedCategory) {
      const filteredItineraries = this.itineraries
        .filter(itinerary => itinerary.maDanhMuc === this.selectedCategory!.maDanhMuc);

      if (filteredItineraries.length > 0) {
        this.pagedItineraries = filteredItineraries
          .slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage);
      } else {
        // Không có lịch trình phù hợp với loại hình đã chọn
        this.pagedItineraries = [];
      }
    } else {
      this.pagedItineraries = this.itineraries.slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage);
    }
  }
}
