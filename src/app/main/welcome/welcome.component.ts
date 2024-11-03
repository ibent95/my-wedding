import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  template: `
    <div class="intro-banner">
      <h2 class="text-6xl tracking-wide fourth-text-color text-center">
        Selamat datang
        @if (true) {
          , Ibnu & Dina
        }
      </h2>
      <button type="button" role="button" class="appearance-none rounded-lg outline-double transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 m-4 p-3" (click)="openInvitation()">
        Buka Undangan
      </button>
    </div>
  `,
  styles: `
    .intro-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--primary-color);
      //color: white;
      z-index: 1000;
    }
  `
})
export class WelcomeComponent {

  @Output() onOpenInvitation: EventEmitter<void> = new EventEmitter<void>();

  public openInvitation(): void {
    this.onOpenInvitation.emit();
  }

}
