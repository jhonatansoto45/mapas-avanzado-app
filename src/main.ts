import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

(Mapboxgl as any).accessToken =
  'pk.eyJ1IjoiamFzYjQ1NiIsImEiOiJjbGRrYWZjMHgwNm8zM3dwN2Y4OGwybG43In0.PF_oGfFWFbNV0QCcA0p38Q';

if (!navigator.geolocation) {
  alert('Navegador no soporta la Geolocation');
  throw new Error('Navegador no soporta la Geolocation');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
