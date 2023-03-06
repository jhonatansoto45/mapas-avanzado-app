import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDiv!: ElementRef;

  constructor(private placesService: PlacesService) {}

  ngAfterViewInit(): void {
if(!this.placesService.useLocation) throw new Error ('No hay placesService.useLocation')

    const map = new Mapboxgl.Map({
      container: this.mapDiv.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }
}
