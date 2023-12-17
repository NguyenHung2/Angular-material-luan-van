import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import axios from 'axios';
import 'leaflet-routing-machine';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service';
import { Router } from '@angular/router';
import 'leaflet.locatecontrol';
import * as Graphology from 'graphology';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit {
  departureAddress: string = '';
  destinationAddress: string = '';
  departureCoordinates: { lat: number, lng: number } | undefined;
  destinationCoordinates: { lat: number, lng: number } | undefined;
  map: L.Map | undefined;
  showDestinationOptions: boolean = false;
  destinationOptions: Destination[] = [];
  destinations: Destination[] = [];
  marker: L.Marker | undefined;
  markedCoordinates: { lat: number, lng: number, popupText: string }[] = [];

  constructor(private destinationService: DestinationService, private router: Router) { }

  ngOnInit(): void {
    this.initMap();
    this.loadDestinations();
  }

  initMap() {
    this.map = L.map('map').setView([10.384559, 105.435647], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    (L.control as any).locate().addTo(this.map);
    // this.updateCoordinatesAndAddress(10.384559, 105.435647, 'departure');
  }


  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              const isDuplicate = this.markedCoordinates.some(coord => coord.lat === latitude && coord.lng === longitude);

              if (!isDuplicate) {
                this.updateCoordinatesAndAddress(latitude, longitude, 'departure');

                if (this.map) {
                  this.addMarker(this.map, latitude, longitude, 'Vị trí của bạn');

                  if (this.destinationCoordinates) {
                    L.Routing.control({
                      waypoints: [
                        L.latLng(latitude, longitude),
                        L.latLng(this.destinationCoordinates.lat, this.destinationCoordinates.lng),
                      ],
                    }).addTo(this.map);

                    if (this.markedCoordinates.length > 1) {
                      const waypoints = [
                        L.latLng(this.destinationCoordinates.lat, this.destinationCoordinates.lng),
                        ...this.markedCoordinates.map(coord => L.latLng(coord.lat, coord.lng)),
                      ];

                      L.Routing.control({
                        waypoints: waypoints,
                      }).addTo(this.map);
                    }
                  } else {
                    console.error('Tọa độ đích không hợp lệ.');
                  }
                } else {
                  console.error('Bản đồ chưa được khởi tạo.');
                }
              } else {
                console.log('Duplicate coordinates. Skipping marker addition.');
              }
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
        } else if (result.state === 'prompt') {
          console.warn('Geolocation permission prompt is displayed. Please allow access.');
        } else if (result.state === 'denied') {
          console.error('Geolocation permission is denied. Please enable location services.');
        }
      });
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }


  getCoordinatesForDestination() {
    const selectedDestination = this.destinations.find(destination => destination.tenDiemDen === this.destinationAddress);
  
    if (selectedDestination) {
      const latitude = selectedDestination.kinhDo || 0;
      const longitude = selectedDestination.viDo || 0;
  
      // Check if the coordinates already exist in markedCoordinates
      const isDuplicate = this.markedCoordinates.some(coord => coord.lat === latitude && coord.lng === longitude);
  
      if (!isDuplicate) {
        console.log(latitude);
        console.log(longitude);
        const popupText = this.destinationAddress; // Use the destination name as popup text
        const newCoordinates = { lat: latitude, lng: longitude, popupText: popupText };
        this.markedCoordinates.push(newCoordinates);
        console.log('All marked coordinates:', this.markedCoordinates);
  
        if (this.map) {
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }
  
          this.marker = L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup(popupText)
            .openPopup();
  
          this.map.setView([latitude, longitude], 15);
  
          if (this.departureCoordinates) {
            L.Routing.control({
              waypoints: [
                L.latLng(this.departureCoordinates.lat, this.departureCoordinates.lng),
                L.latLng(latitude, longitude),
              ],
            }).addTo(this.map);
          } else {
            console.error('Tọa độ xuất phát không hợp lệ.');
          }
        } else {
          console.error('Bản đồ chưa được khởi tạo.');
        }
      } else {
        console.log('Duplicate coordinates. Skipping marker addition.');
      }
    } else {
      console.error('Không tìm thấy địa điểm đích.');
    }
  }
  

  loadDestinations() {
    this.destinationService.getAllDestinations().subscribe(
      (destinations) => {
        this.destinations = destinations;
      },
      (error) => {
        console.error('Lỗi khi tải danh sách điểm đến:', error);
      }
    );
  }

  updateDestinationOptions() {
    if (this.destinationAddress.length > 0) {
      this.destinationOptions = this.destinations.filter((destination) => {
        return destination.tenDiemDen.toLowerCase().includes(this.destinationAddress.toLowerCase());
      });

      this.showDestinationOptions = this.destinationOptions.length > 0;
    } else {
      this.showDestinationOptions = false;
      this.destinationOptions = [];
    }
  }

  selectDestination(destination: Destination) {
    this.destinationAddress = destination.tenDiemDen;
    this.destinationCoordinates = { lat: destination.viDo || 0, lng: destination.kinhDo || 0 };
    this.showDestinationOptions = false;
  }

  updateCoordinatesAndAddress(latitude: number, longitude: number, type: 'departure' | 'destination') {
    const coordinates = { lat: latitude, lng: longitude };
    if (type === 'departure') {
      this.departureCoordinates = coordinates;
    } else {
      this.destinationCoordinates = coordinates;
    }
    this.updateAddressFromCoordinates(coordinates, type);
  }

  updateAddressFromCoordinates(coordinates: any, type: 'departure' | 'destination') {
    axios
      .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.lat}&lon=${coordinates.lng}`)
      .then((response) => {
        const address = response.data.display_name;
        if (type === 'departure') {
          this.departureAddress = address;
        } else {
          this.destinationAddress = address;
        }
      })
      .catch((error) => {
        console.error('Không thể lấy địa chỉ:', error);
      });
  }

  addMarker(map: L.Map, latitude: number, longitude: number, popupText: string) {
    // Remove existing markers on the same coordinate
    this.markedCoordinates = this.markedCoordinates.filter(coord => coord.lat !== latitude || coord.lng !== longitude);

    const customIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add new marker
    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    marker.bindPopup(popupText).openPopup();

    const newCoordinates = { lat: latitude, lng: longitude, popupText: popupText };
    this.markedCoordinates.push(newCoordinates);

    // Log the coordinates to the console
    console.log('New marker added at coordinates:', newCoordinates);
  }

  search() {
    if (this.map) {
      // Clear existing markers and routes
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          this.map?.removeLayer(layer);
        }
      });

      if (this.markedCoordinates.length >= 3) {
        const waypoints = this.markedCoordinates.map(coord => L.latLng(coord.lat, coord.lng));

        // Add new markers
        waypoints.forEach(coord => {
          this.addMarker(this.map!, coord.lat, coord.lng, 'New Marker');
        });

        // Find and color the shortest path between waypoints
        for (let i = 0; i < waypoints.length - 1; i++) {
          const routeWaypoints = [waypoints[i], waypoints[i + 1]];

          // Find the shortest route
          L.Routing.control({
            waypoints: routeWaypoints,
            lineOptions: {
              styles: [{ color: 'blue', opacity: 1, weight: 5 }]
            },
            routeWhileDragging: true,
          } as L.Routing.RoutingControlOptions).addTo(this.map);

          // Calculate distance and log to the console
          const distance = routeWaypoints[0].distanceTo(routeWaypoints[1]);
          console.log(`Distance between waypoints ${i + 1} and ${i + 2}: ${distance} meters`);
        }
      } else {
        console.error('Vui lòng thêm ít nhất ba điểm để tìm kiếm.');
      }
    } else {
      console.error('Bản đồ chưa được khởi tạo.');
    }
  }


  createItinerary() {
    this.router.navigate(['/lich-trinh/tao-lich-trinh']);
  }

}
