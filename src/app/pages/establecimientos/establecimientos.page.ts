import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
// import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
// import { relativeTimeThreshold } from 'moment';
// import { Geolocation } from '@capacitor/geolocation';


//Leaflet
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-establecimientos',
  templateUrl: './establecimientos.page.html',
  styleUrls: ['./establecimientos.page.scss'],
})
export class EstablecimientosPage implements OnInit{
  // @ViewChild('map') mapView: ElementRef;

  map: Leaflet.Map;
  propertyList = [];

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = new Leaflet.Map('mapId').setView([28.1248,-15.43], 10);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      attribution: 'leaflet providers'
    }).addTo(this.map);

    fetch('./assets/data/locations.json')
      .then(res => res.json())
      .then(data => {
        this.propertyList = data.properties;
        this.createMap();
      })
      .catch(err => console.error(err));
  }

  // ionViewDidLeave() {
  //   CapacitorGoogleMaps.close();
  // }

  createMap() {
    for (const property of this.propertyList) {
      Leaflet.marker([property.lat, property.long]).addTo(this.map)
        .bindPopup(property.name)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  // showCurrentPosition() {
  //   Geolocation.requestPermissions().then(async (permission) => {
  //     const coordinates = await Geolocation.getCurrentPosition();

  //     CapacitorGoogleMaps.addMarker({
  //       latitude: coordinates.coords.latitude,
  //       longitude: coordinates.coords.longitude,
  //       title: 'I am right here!',
  //       snippet: 'Come to visit me!',
  //     });
  //     CapacitorGoogleMaps.setCamera({
  //       latitude: coordinates.coords.latitude,
  //       longitude: coordinates.coords.longitude,
  //       zoom: 12,
  //       bearing: 0,
  //     });
  //   });
  // }
}
