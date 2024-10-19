import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import localeIdExtra from '@angular/common/locales/extra/id';

registerLocaleData(localeId, 'id-ID', localeIdExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'id-ID' }
  ]
};
