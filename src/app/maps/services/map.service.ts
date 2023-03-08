import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map | undefined;

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike): void {
    if (!this.isMapReady) throw Error('El mapa no está inicializado.');

    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }
}
