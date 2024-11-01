import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isLoading()) {
      <section class="loading-screen">
        <p>Memuat...</p>
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
