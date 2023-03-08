import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  useLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];

  constructor(private http: HttpClient) {
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
    //todo: evaluar cuando el query es nulo
this.isLoadingPlaces = true

    this.http
      .get<PlacesResponse>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&access_token=pk.eyJ1IjoiamFzYjQ1NiIsImEiOiJjbGRrYWZjMHgwNm8zM3dwN2Y4OGwybG43In0.PF_oGfFWFbNV0QCcA0p38Q`
      )
      .subscribe((res) => {
        console.log(res.features);

        this.isLoadingPlaces = false
        this.places = res.features
      });
  }
}
