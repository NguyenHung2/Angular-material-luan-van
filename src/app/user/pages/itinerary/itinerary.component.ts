// itinerary.component.ts

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

export interface Itinerary {
  location: string;
  startTime: string;
  endTime: string;
  completed: boolean;
}

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent {
  optimizedItinerary: Itinerary[] = []; // Lưu trữ thông tin lịch trình tối ưu
  startPointIndex: number = 0; // Vị trí của điểm xuất phát
  startPoint: string = '';
  @ViewChild('itineraryForm') itineraryForm!: NgForm;

  constructor(private router: Router) { }

  optimizeItinerary() {
    // Tính toán và lưu thông tin lịch trình tối ưu vào biến optimizedItinerary
    // Ví dụ:
    this.optimizedItinerary = [
      { location: 'Địa điểm 1', startTime: '09:00 AM', endTime: '01:00 PM', completed: true },
      { location: 'Địa điểm 2', startTime: '11:30 AM', endTime: '03:30 PM', completed: false }
      // Thêm các thông tin khác tùy theo logic của bạn
    ];

    // Sau khi có dữ liệu tối ưu, chuyển hướng đến trang MapComponent và truyền dữ liệu qua route
    this.router.navigate(['/map'], { state: { itinerary: this.optimizedItinerary } });
  }

  openGoogleMapsDialog() {
    // Mở cửa sổ popup Google Maps và đợi người dùng chọn vị trí
    const googleMapsUrl = 'https://www.google.com/maps';
    const googleMapsWindow = window.open(googleMapsUrl, 'Google Maps', 'width=800,height=600');
    
    // Lắng nghe sự kiện khi Google Maps trả về vị trí
    window.addEventListener('message', (event) => {
      if (event.origin === 'https://www.google.com' && event.data.type === 'selected-location') {
        const selectedLocation = event.data.location;
        this.updateStartPoint(selectedLocation);
        if (googleMapsWindow) {
          googleMapsWindow.close(); // Đóng cửa sổ popup sau khi lấy vị trí
        }
      }
    });    
  }

  updateStartPoint(location: string) {
    // Cập nhật giá trị của input "Điểm xuất phát" với vị trí từ Google Maps
    this.itineraryForm.controls['start-point'].setValue(location);
  }
}
