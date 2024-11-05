import { Injectable, InjectionToken } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService { }

export const IMAGE_LOADER = new InjectionToken<(src: string, width: number) => string>('imageLoader');

export const customImageLoader = (src: string, width: number): string => {
  // This function can adjust the image path based on width or any other parameters you prefer
  return `${src}?w=${width}`;
};
