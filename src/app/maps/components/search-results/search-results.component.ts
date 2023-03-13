import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places.interface';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  selectedId: string = '';

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature): void {
    this.selectedId = place.id;

    const [lng, lat] = place.center;

    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature): void {
    if (!this.placesService.useLocation) throw new Error('No hay userLocation');

    const start = this.placesService.useLocation;
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }
}
