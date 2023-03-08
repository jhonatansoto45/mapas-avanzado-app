import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss'],
})
export class BtnMyLocationComponent {
  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) {}

  goToMyLocation() {
    if (!this.placesService.isUserLocationReady)
      throw new Error('No hay ubicación de usuario.');
    if (!this.mapService.isMapReady)
      throw new Error('No hay un mapa disponible.');

    this.mapService.flyTo(this.placesService.useLocation!);
  }
}
