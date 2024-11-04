import { ApplicationConfig, importProvidersFrom, InjectionToken, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { environment } from './../environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { IMAGE_CONFIG, registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import localeIdExtra from '@angular/common/locales/extra/id';
import { LoadingService } from './services/loading.service';
import { customImageLoader, IMAGE_LOADER } from './services/image-loader.service';

export const ENV = new InjectionToken<string>('ENV');
export const CONFIG: object = environment;

registerLocaleData(localeId, 'id-ID', localeIdExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ENV, useValue: CONFIG },
    { provide: LOCALE_ID, useValue: 'id-ID' },
    { provide: IMAGE_CONFIG, useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true } },
    { provide: IMAGE_LOADER, useValue: customImageLoader },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LoadingService),
  ]
};
