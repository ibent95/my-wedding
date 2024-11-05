import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";
import { LoadingService } from './services/loading.service';
import { LoadingScreenComponent } from "./shared/loading-screen/loading-screen.component";
import { WelcomeComponent } from './shared/welcome/welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingScreenComponent, WelcomeComponent, HeaderComponent, MainComponent, FooterComponent],
  template: `
    <app-loading-screen></app-loading-screen>

    @if (isLoadingComplete && isWelcomeVisible) {
      <app-welcome (onOpenInvitation)="onOpenInvitation()"></app-welcome>
    }

    <!--
      This header component is not used anymore
      <app-header></app-header>
    -->

    <app-main [isWelcomeClosed]="isWelcomeVisible"></app-main>

    <app-footer></app-footer>
  `,
  styles: ``
})
export class AppComponent implements OnInit {

  private loadingService: LoadingService = inject(LoadingService);

  title: string = 'my-wedding';
  isLoadingComplete: boolean = false;
  isWelcomeVisible: boolean = true;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  ngOnInit(): void {
    window.onload = () => {
      this.loadingService.setLoading(false);
      this.isLoadingComplete = true;
      this.onShowWelcomeComponent();
    };
  }

  private onShowWelcomeComponent(): void {
    // Delay showing the welcome component briefly to allow transition
    setTimeout(() => {
      this.isWelcomeVisible = true;
    }, 500); // Adjust timing as needed
  }

  public onOpenInvitation(): void {
    /**
     * Set variable value to false and send it
     * to play music in the audio player
     */
    this.isWelcomeVisible = false;
  }

}
