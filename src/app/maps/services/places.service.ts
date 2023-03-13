import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/index';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  useLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización.');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (!this.useLocation) throw new Error('No hay user location');

    //todo: evaluar cuando el query es nulo

    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    this.isLoadingPlaces = true;

    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.useLocation.join(','),
        },
      })
      .subscribe((res) => {
        this.isLoadingPlaces = false;
        this.places = res.features;
        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }

  deletePlaces(): void {
    this.places = [];
  }
}
