import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  searchResults: any[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('longitudeInput') longitudeInput!: ElementRef;
  @ViewChild('latitudeInput') latitudeInput!: ElementRef;
  @ViewChild('originInput') originInput!: ElementRef; 

  ngOnInit() {
    mapboxgl!.accessToken = 'pk.eyJ1IjoiYjE5MTA0ODAiLCJhIjoiY2xpaW12ZjJ5MXZ2ajNqczF4Y2NzYmNrdiJ9.DaXt-2gXJinZeoBDM63rAA';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [105.1503, 10.5363], 
      zoom: 9 
    });
  }

  searchLocation(event: any) {
    const query = event.target.value;
    const countryBias = 'VN';

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}&country=${countryBias}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.searchResults = data.features;
      });
  }

  selectLocation(location: any) {
    const coordinates = location.geometry.coordinates;

    this.map.setCenter(coordinates);
    this.map.setZoom(14);

    this.searchInput.nativeElement.value = '';
    this.searchResults = [];
  }

  searchByCoordinates() {
    const longitude = parseFloat(this.longitudeInput.nativeElement.value);
    const latitude = parseFloat(this.latitudeInput.nativeElement.value);

    if (!isNaN(longitude) && !isNaN(latitude)) {
      const coordinates = new mapboxgl.LngLat(longitude, latitude);

      if (this.map.getSource('point')) {
        this.map.removeSource('point');
        this.map.removeLayer('point');
      }

      this.map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              }
            }
          ]
        }
      });

      this.map.addLayer({
        id: 'point',
        type: 'circle',
        source: 'point',
        paint: {
          'circle-radius': 6,
          'circle-color': '#FF0000'
        }
      });

      this.map.setCenter(coordinates);
      this.map.setZoom(14);

      this.longitudeInput.nativeElement.value = '';
      this.latitudeInput.nativeElement.value = '';
    } else {
      console.log('Invalid coordinates');
    }
  }

  searchByOrigin() {
    const origin = this.originInput.nativeElement.value;
    this.originInput.nativeElement.value = '';
  }
}
