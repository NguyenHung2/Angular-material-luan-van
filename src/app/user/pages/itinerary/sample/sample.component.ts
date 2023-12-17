import { PdfExportService } from './../../../../admin/services/pdf-export.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import axios from 'axios';

import { MatDialog } from '@angular/material/dialog';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service';
import { ScheduleDestination, ScheduleDestinationService } from 'src/app/admin/services/schedule-destination.service';
import { DestinationCategory, DestinationCategoryService } from 'src/app/admin/services/destination-category.service';
import { Schedule, ScheduleService } from 'src/app/admin/services/schedule.service';
import { SampleDialogComponent } from '../sample-dialog/sample-dialog.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from 'src/app/admin/services/data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  map: L.Map | undefined;
  destinationInfo: Destination[] = [];
  destinationCategoryList: DestinationCategory[] = [];
  scheduleInfo: Schedule[] = [];
  scheduleDestinationInfo: ScheduleDestination[] = [];
  selectedCategoryName: string | undefined;
  selectedScheduleName: string | undefined;
  tenDiemDen: string | undefined;
  waypoints: L.LatLng[] = [];
  routingControl: any;
  scheduleActivities: string[] = [];
  hideLeftPanel: boolean = false;
  hideRightPanel: boolean = false;

  constructor(
    private destinationService: DestinationService,
    private scheduleDestinationService: ScheduleDestinationService,
    private dialog: MatDialog,
    private destinationCategoryService: DestinationCategoryService,
    private scheduleService: ScheduleService,
    private router: Router,
    private PdfExportService: PdfExportService,
    private sanitizer: DomSanitizer,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.map = L.map('map').setView([10.5411, 105.1245], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.loadCategories();
    this.loadSchedules();
    this.loadScheduleDestinations();
    // Use forkJoin to wait for all data to be loaded
    forkJoin([
      this.destinationCategoryService.getAllDestinationCategories(),
      this.scheduleService.getSchedules(),
      this.scheduleDestinationService.getScheduleDestination()
    ]).subscribe(
      ([categories, schedules, scheduleDestinations]) => {
        this.destinationCategoryList = categories;
        console.log('loadCategories', this.destinationCategoryList);

        this.scheduleInfo = schedules;
        console.log('loadSchedules', this.scheduleInfo);

        this.scheduleDestinationInfo = scheduleDestinations;
        console.log('loadScheduleDestinations', scheduleDestinations);

        // After all data is loaded, call updateScheduleAndMap
        this.updateScheduleAndMap();
      },
      error => {
        console.error('Error loading data:', error);
      }
    );
  }

  loadCategories() {
    this.destinationCategoryService.getAllDestinationCategories().subscribe(categories => {
      this.destinationCategoryList = categories;
      console.log('loadCategories', this.destinationCategoryList);
    });
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe(schedules => {
      this.scheduleInfo = schedules;
      console.log('loadSchedules', this.scheduleInfo);
    });
  }

  loadScheduleDestinations() {
    this.scheduleDestinationService.getScheduleDestination().subscribe(scheduleDestinations => {
      this.scheduleDestinationInfo = scheduleDestinations;
      console.log('loadScheduleDestinations', scheduleDestinations);
    });
  }

  openDestinationDialog() {
    const dialogRef = this.dialog.open(SampleDialogComponent);
    localStorage.removeItem('selectedScheduleLength');
    // dialogRef.afterClosed().subscribe((result: { categoryId: number, scheduleLength: number } | null) => {
    dialogRef.afterClosed().subscribe((result: { selectedScheduleId: number } | null) => {
      if (result) {
        // localStorage.setItem('selectedCategoryId', result.categoryId.toString());
        localStorage.setItem('selectedScheduleLength', result.selectedScheduleId.toString());

        this.updateScheduleAndMap();
      }
    });
  }

  updateScheduleAndMap() {
    // const storedCategoryId = localStorage.getItem('selectedCategoryId');
    const storedScheduleLength = localStorage.getItem('selectedScheduleLength');

    // if (storedCategoryId && storedScheduleLength) {
    if (storedScheduleLength) {
      // const selectedCategoryId = parseInt(storedCategoryId, 10);
      const selectedScheduleLength = parseInt(storedScheduleLength, 10);

      // console.log('selectedCategoryId', selectedCategoryId);
      console.log('selectedScheduleLength', selectedScheduleLength);

      // const selectedCategory = this.destinationCategoryList.find(category => category.maDanhMuc === selectedCategoryId);

      console.log('Selected Category:', this.destinationCategoryList.find(category => category.maDanhMuc));
      // console.log('Selected Category:', selectedCategory);

      // if (selectedCategory) {
      //   this.selectedCategoryName = selectedCategory.tenDanhMuc;
      // }

      const selectedSchedule = this.scheduleInfo.find(schedule => schedule.maLichTrinh === selectedScheduleLength);

      console.log('Selected Schedule:', selectedSchedule);

      if (selectedSchedule) {
        this.selectedScheduleName = selectedSchedule.tieuDe;

        console.log('Selected Schedule Name:', this.selectedScheduleName);
        console.log('Selected Schedule ID:', selectedSchedule.maLichTrinh);
        console.log('All Schedule Destinations:', this.scheduleDestinationInfo);

        this.getDestinationsByScheduleId(selectedSchedule.maLichTrinh);
      } else {
        console.log('No matching schedule found.');
      }
    }
  }

  getDestinationsByScheduleId(scheduleId: number) {
    const destinationsInSchedule = this.scheduleDestinationInfo
      .filter(scheduleDestination => scheduleDestination.lichTrinh?.maLichTrinh === scheduleId)
      .map(scheduleDestination => scheduleDestination.diemDen?.maDiemDen);

    const uniqueDestinations = Array.from(new Set(destinationsInSchedule)).filter(destinationId => destinationId);

    console.log('Schedule ID:', scheduleId);
    console.log('Destination IDs in Schedule:', uniqueDestinations);


    const matchingScheduleDestinations = this.scheduleDestinationInfo
      .filter(scheduleDestination => scheduleDestination.lichTrinh?.maLichTrinh === scheduleId);

    console.log(`Detailed information for Destination ID ${scheduleId}:`);
    console.log(matchingScheduleDestinations);

    this.scheduleActivities = matchingScheduleDestinations.map(destination => destination.hoatDong || '');

    uniqueDestinations.forEach(destinationId => {
      if (destinationId) {
        this.destinationService.getDestinationById(destinationId).subscribe((destination: Destination) => {
          if (destination) {
            console.log('Destination Info:', destination);
            // Thêm đối tượng destination vào mảng destinationInfo
            this.destinationInfo.push(destination);
            // Lấy tọa độ
            const latitude = destination.kinhDo || 0;
            const longitude = destination.viDo || 0;

            // Gọi hàm addMarker để thêm marker lên bản đồ
            this.addMarker(this.map, latitude, longitude, destination.tenDiemDen || 'Điểm đến');

            // Thêm tọa độ vào mảng waypoints
            this.waypoints.push(L.latLng(latitude, longitude));

            // Kiểm tra nếu có ít nhất 2 điểm đến thì vẽ đường đi
            if (this.waypoints.length >= 2) {
              this.drawRoute(this.waypoints);
            }
          }
        });
      }
    });

    console.log('destinationInfo after forEach:', this.destinationInfo);
  }

  addMarker(map: L.Map | undefined, latitude: number, longitude: number, popupText: string) {
    axios
      .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
      .then((response) => {
        const address = response.data.display_name;
        const latLon = `Latitude: ${latitude}, Longitude: ${longitude}`;

        if (map) {
          const customIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
          marker.bindPopup(`${address}<br>${latLon}<br>${popupText}`).openPopup();
        } else {
          console.error('Bản đồ chưa được khởi tạo.');
        }
      })
      .catch((error) => {
        console.error('Không thể lấy địa chỉ:', error);
      });
  }

  // Hàm vẽ đường đi giữa các điểm đến
  drawRoute(waypoints: L.LatLng[]) {
    if (this.map && waypoints.length > 1) {
      const validWaypoints = waypoints.filter(waypoint => waypoint.lat !== 0 && waypoint.lng !== 0);

      if (validWaypoints.length > 1) {
        // Kiểm tra nếu đã có điều khiển đường đi thì xóa nó trước khi vẽ mới
        if (this.routingControl) {
          this.map.removeControl(this.routingControl);
        }

        // Tạo điều khiển đường đi mới
        this.routingControl = L.Routing.control({
          waypoints: validWaypoints,
          routeWhileDragging: true,
        }).addTo(this.map);
      } else {
        console.error('Không đủ điểm đến để tạo đường đi.');
      }
    }
  }

  exportToPDF() {
    // Tìm lịch trình được chọn
    const selectedSchedule = this.scheduleInfo.find(schedule => schedule.tieuDe === this.selectedScheduleName);

    // Kiểm tra xem lịch trình được chọn có tồn tại không
    if (selectedSchedule) {
      // Lọc điểm đến của lịch trình dựa trên lịch trình được chọn
      const matchingScheduleDestinations = this.scheduleDestinationInfo
        .filter(scheduleDestination => scheduleDestination.lichTrinh?.maLichTrinh === selectedSchedule.maLichTrinh);

      // Kiểm tra xem có điểm đến của lịch trình được chọn hay không
      if (matchingScheduleDestinations.length > 0) {
        // Chuẩn bị dữ liệu để truyền vào PdfExportComponent
        const pdfExportData = {
          title: this.selectedScheduleName,
          activities: this.destinationInfo,
          schedules: [selectedSchedule],  // Truyền lịch trình được chọn dưới dạng mảng
          scheduleDestinations: matchingScheduleDestinations
        };

        // Log dữ liệu trước khi chuyển hướng đến PdfExportComponent
        console.log('Dữ Liệu để Xuất ra PDF:', pdfExportData);

        this.PdfExportService.setPdfExportData(pdfExportData);

        // Sử dụng Angular Router để chuyển hướng đến PdfExportComponent với dữ liệu trong trạng thái của route
        this.router.navigate(['/pdf-export']);
      } else {
        console.error('Không tìm thấy điểm đến nào của lịch trình được chọn.');
      }
    } else {
      console.error('Không tìm thấy lịch trình được chọn.');
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  toggleLeftPanel() {
    this.hideLeftPanel = !this.hideLeftPanel;
    this.hideRightPanel = false;
  }

  toggleRightPanel() {
    console.log('Toggle Right Panel');
    this.hideRightPanel = !this.hideRightPanel;
    this.hideLeftPanel = false;
  }
}