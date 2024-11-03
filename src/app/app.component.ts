import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpeningRemarksComponent } from "./main/opening-remarks/opening-remarks.component";
import { WiseWordsOrPrayerComponent } from "./main/wise-words-or-prayer/wise-words-or-prayer.component";
import { InvitationDetailsComponent } from "./main/invitation-details/invitation-details.component";
import { WishesAndHopesComponent } from "./main/wishes-and-hopes/wishes-and-hopes.component";
import { ClosingRemarksComponent } from "./main/closing-remarks/closing-remarks.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";
import { LoadingService } from './services/loading.service';
import { LoadingScreenComponent } from "./shared/loading-screen/loading-screen.component";
import { WelcomeComponent } from './main/welcome/welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingScreenComponent, WelcomeComponent, HeaderComponent, MainComponent, FooterComponent],
  template: `
    <app-loading-screen></app-loading-screen>

    @if (isLoadingComplete && isWelcomeVisible) {
      <app-welcome (onOpenInvitation)="onOpenInvitation()"></app-welcome>
    }

    <app-header></app-header>

    <app-main [isWelcomeClosed]="isWelcomeVisible"></app-main>

    <app-footer></app-footer>
  `,
  styles: ``
})
export class AppComponent implements OnInit {

  private loadingService: LoadingService = inject(LoadingService);
  isLoadingComplete = false;
  title = 'my-wedding';
  isWelcomeVisible = true;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  ngOnInit(): void {
    window.onload = () => {
      this.loadingService.setLoading(false);
      this.isLoadingComplete = true;
    };
  }

  showWelcomeComponent() {
    // Delay showing the welcome component briefly to allow transition
    setTimeout(() => {
      this.isWelcomeVisible = true;
    }, 500); // Adjust timing as needed
  }

  onOpenInvitation() {
    this.isWelcomeVisible = false;
    // Attempt to play audio after welcome closes
    //this.audioPlayer.nativeElement.play().catch((error: any) => {
    //  console.warn('Autoplay blocked; manual interaction required.', error);
    //});
  }

}
