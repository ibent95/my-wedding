import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isLoading()) {
      <section class="loading-screen flex flex-col">
        <svg xmlns='http://www.w3.org/2000/svg' class="animate-spin h-10 w-10" viewBox="0 0 24 24" fill="var(--primary-color)" width="24" height="24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Memuat...</span>
      </section>
    }
  `,
  styles: `
    section {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      z-index: 1000; /* Ensure it's on top */
    }
  `
})
export class LoadingScreenComponent {

  private loadingService: LoadingService = inject(LoadingService);

  isLoading(): boolean {
    return this.loadingService.isLoading();
  }

}
