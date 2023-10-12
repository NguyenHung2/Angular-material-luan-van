import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  // Dữ liệu lịch trình tối ưu
  optimizedItinerary = [
    {
      location: 'Cổng Trời Tri Tôn',
      startTime: '09:00 AM, Ngày 1',
      endTime: '01:00 PM, Ngày 1',
      completed: true,
    },
    {
      location: 'Hồ Tà Pạ',
      startTime: '11:30 AM, Ngày 1',
      endTime: '03:30 PM, Ngày 1',
      completed: false,
    },
    {
      location: 'Rừng Tràm Trà Sư',
      startTime: '10:00 AM, Ngày 2',
      endTime: '02:00 PM, Ngày 2',
      completed: true,
    },
    // Thêm dữ liệu cho các điểm khác tùy theo số lượng địa điểm
  ];

  startPointIndex: number = 0; // Vị trí của điểm xuất phát (Cổng Trời Tri Tôn)

  constructor() {}

  ngOnInit(): void {}
}
