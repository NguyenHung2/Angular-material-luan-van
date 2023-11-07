import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'

@Component({
  selector: 'app-schedule-map',
  templateUrl: './schedule-map.component.html',
  styleUrls: ['./schedule-map.component.css']
})
export class ScheduleMapComponent implements OnInit {
  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    const map = L.map('map').setView([10.384559, 105.435647], 12); // Điều chỉnh tọa độ và mức phóng đại cho tỉnh An Giang

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Hiển thị tên tỉnh An Giang trên bản đồ
    L.marker([10.384559, 105.435647]).addTo(map)
      .bindPopup('Tỉnh An Giang, Việt Nam')
      .openPopup();
  }
}
