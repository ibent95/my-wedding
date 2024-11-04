import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="intro-banner grid grid-cols-1 justify-between">

      <div class="flex flex-col justify-end">

        <span class="dancing-script-font text-4xl tracking-wide fourth-text-color text-center" [innerHTML]="firstGreetingMessage"></span>

        <span class="dancing-script-font text-6xl tracking-wide fourth-text-color text-center" [innerHTML]="toGreetingMessage"></span>

      </div>


      <div class="flex flex-col justify-center">

        <span class="dancing-script-font text-xl tracking-wide fourth-text-color text-center" [innerHTML]="secondGreetingMessage"></span>

        <div class="self-center">

          <button type="button" role="button" class="appearance-none rounded-lg outline-double transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 m-4 p-3" (click)="openInvitation()">
            Buka Undangan
          </button>

        </div>

      </div>

      <span class="self-end justify-self-center text-xs">Made with love, Dina & Ibnu.</span>

    </section>
  `,
  styles: `
    .intro-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--primary-color);
      z-index: 1000;
    }
  `
})
export class WelcomeComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);

  @Output() onOpenInvitation: EventEmitter<void> = new EventEmitter<void>();

  firstGreetingMessage: string = 'Selamat datang';
  toGreetingMessage!: string;
  secondGreetingMessage: string = 'diundangan kami, Dina & Ibnu.';

  ngOnInit(): void {

    // Subscribe to the query parameters
    this.route.queryParams.subscribe((params: any) => {
      if (params['to']) {
        // Add the comma sign to append the greeting message and to / address name
        this.firstGreetingMessage += ',';
        this.toGreetingMessage = params['to'];
      }
    });

    // Get the fragment identifier (e.g., #openingRemarks)
    this.route.fragment.subscribe((fragment: any) => {
      if (fragment) {
        // Scroll to the element with the matching id
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
      }
    });

  }

  public openInvitation(): void {
    this.onOpenInvitation.emit();
  }

}
