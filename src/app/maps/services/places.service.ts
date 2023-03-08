import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/index';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  useLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];

  constructor(private placesApi: PlacesApiClient) {
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
    this.isLoadingPlaces = true;

    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.useLocation.join(','),
        },
      })
      .subscribe((res) => {
        console.log(res.features);

        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }
}
