import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import axios from 'axios';

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
    const map = L.map('map').setView([10.384559, 105.435647], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const waypoints = [
      L.latLng(10.384559, 105.435647), 
      L.latLng(10.50566, 104.99149),
      L.latLng(10.68326, 105.08005), // Add the new waypoint
      L.latLng(10.60830, 104.96013) // Add the additional waypoint
    ];

    const routingControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
    }).addTo(map);

    // Callback được gọi khi tuyến đường được tính toán
    routingControl.on('routesfound', (event) => {
      const route = event.routes[0];
      const distanceInKm = (route.summary.totalDistance / 1000).toFixed(1); // Convert to kilometers and round to 1 decimal place
      const durationInSeconds = route.summary.totalTime; // Thời gian (đơn vị: giây)
    
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
    
      console.log(`Khoảng cách: ${distanceInKm} km`);
      console.log(`Thời gian: ${hours} giờ ${minutes} phút`);
    
      // Log the raw duration as well
      console.log(`Raw thời gian: ${durationInSeconds} giây`);
    });
    
    // Use the predefined icons
    const greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const blueIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.addMarker(map, 10.384559, 105.435647, 'Tỉnh An Giang, Việt Nam', greenIcon);
    this.addMarker(map, 10.50566, 104.99149, 'Núi Cấm', blueIcon);
    this.addMarker(map, 10.68326, 105.08005, 'Miếu bà chúa xứ - núi Sam', blueIcon);
    this.addMarker(map, 10.60830, 104.96013, 'Phước Lâm Tự - Chùa Lầu', blueIcon);

    L.marker([10.384559, 105.435647], { icon: greenIcon }).addTo(map).openPopup();
  }

  addMarker(map: L.Map, latitude: number, longitude: number, popupText: string, customIcon: L.Icon) {
    axios
      .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
      .then((response) => {
        const address = response.data.display_name;
        const latLon = `Latitude: ${latitude}, Longitude: ${longitude}`;

        const marker = L.marker([latitude, longitude], { draggable: true, icon: customIcon }).addTo(map);
        marker.bindPopup(`${address}<br>${latLon}<br>${popupText}`);
      })
      .catch((error) => {
        console.error('Không thể lấy địa chỉ:', error);
      });
  }
}
