import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";
import { LoadingService } from './services/loading.service';
import { LoadingScreenComponent } from "./shared/loading-screen/loading-screen.component";
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoadingScreenComponent, WelcomeComponent, MainComponent, FooterComponent],
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

  private meta: Meta = inject(Meta);
  private title: Title = inject(Title);
  private loadingService: LoadingService = inject(LoadingService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  appTitle: string = 'Dina & Ibnu wedding invitation app.';
  isLoadingComplete: boolean = false;
  isWelcomeVisible: boolean = true;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  constructor() {
    this.title.setTitle(this.appTitle);
    this.meta.updateTag({
      name: 'description',
      content: 'Join us for our wedding celebration on December, 2nd 2024.'
    });
  }

  ngOnInit(): void {
    //window.onload = () => {
    //  this.loadingService.setLoading(false);
    //  this.changeDetector.detectChanges()

    //  if (!this.loadingService.isLoading()) {
    //    this.isLoadingComplete = true;
    //    this.onShowWelcomeComponent();
    //  }
    //  console.log('1 -> ngOnInit');
    //};

    window.addEventListener('load', () => {
      setTimeout(() => { // Add a slight delay to ensure all assets are ready
        this.loadingService.setLoading(false);

        if (!this.isLoadingComplete) {
          this.isLoadingComplete = true;
          this.onShowWelcomeComponent();
        }

        this.changeDetector.detectChanges();
      }, 100); // Adjust the delay as needed (e.g., 100ms)
    });

    // Fallback to ensure the loading screen disappears after a max timeout
    setTimeout(() => {
      this.loadingService.setLoading(false);

      if (!this.isLoadingComplete) {
        this.isLoadingComplete = true;
        this.onShowWelcomeComponent();
      }

      this.changeDetector.detectChanges();
    }, 7000); // Adjust this timeout value as needed (e.g., 5000ms for 5 seconds)
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
