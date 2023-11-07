import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as L from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;
  private selectedKinhDoXuatPhat: number = 0;
  private selectedViDoXuatPhat: number = 0;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    private elementRef: ElementRef
  ) {
    // Khởi tạo tọa độ Kinh Độ và Vĩ Độ ban đầu
    this.selectedKinhDoXuatPhat = 0;
    this.selectedViDoXuatPhat = 0;
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    this.initSearch();
  }

  initMap() {
    // Khởi tạo bản đồ Leaflet cho An Giang (điều chỉnh tọa độ và mức phóng to theo nhu cầu)
    this.map = L.map(this.elementRef.nativeElement.querySelector('#map')).setView([10.3867, 105.4365], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Xử lý sự kiện click để chọn điểm xuất phát
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.marker) {
        this.updateMarker(e.latlng);
      }
    });
  }

  initSearch() {
    const searchControl = L.control.geocoder({
      defaultMarkGeocode: false,
    }).addTo(this.map);

    searchControl.on('markgeocode', (e: any) => {
      const location = e.geocode.center;
      this.updateMarker(location);
    });

    // Attach the search input to the Leaflet geocoder
    const searchInput = this.elementRef.nativeElement.querySelector('#search-input');
    searchControl.getSearchElement = function () {
      return searchInput;
    };
  }

  updateMarker(location: L.LatLng) {
    // Loại bỏ marker trước và thêm một marker mới ở vị trí hiện tại
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker(location).addTo(this.map);

    // Cập nhật tọa độ Kinh Độ và Vĩ Độ dựa trên tọa độ mới
    this.selectedKinhDoXuatPhat = location.lat;
    this.selectedViDoXuatPhat = location.lng;
  }


  onNoClick(): void {
    this.dialogRef.close(); // Đóng dialog khi nhấn "Hủy" (Cancel)
  }

  onSaveClick(): void {
    // Gửi tọa độ Kinh Độ và Vĩ Độ đã chọn về cho component cha
    this.dialogRef.close({
      kinhDo: this.selectedKinhDoXuatPhat,
      viDo: this.selectedViDoXuatPhat
    });
  }

  onGetCurrentLocation(): void {
    if ('geolocation' in navigator) {
      // Sử dụng API vị trí địa lý của trình duyệt để lấy vị trí hiện tại
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Căn giữa bản đồ ở vị trí hiện tại
          this.map.setView([latitude, longitude], 13);
          this.updateMarker(L.latLng(latitude, longitude));
        },
        (error) => {
          console.error('Lỗi khi lấy vị trí:', error);
        }
      );
    } else {
      console.error('Trình duyệt không hỗ trợ vị trí địa lý.');
    }
  }
}
