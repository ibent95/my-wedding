import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: boolean = true;

  isLoading(): boolean {
    return this.loading;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

}
