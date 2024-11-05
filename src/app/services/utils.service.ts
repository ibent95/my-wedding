import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  generateId(maxNumber: number = 100): string {
    return Math.floor(Math.random() * maxNumber).toString();
  }

}
