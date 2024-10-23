import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { OpeningRemarksComponent } from './opening-remarks/opening-remarks.component';
import { WiseWordsOrPrayerComponent } from './wise-words-or-prayer/wise-words-or-prayer.component';
import { InvitationDetailsComponent } from './invitation-details/invitation-details.component';
import { WishesAndHopesComponent } from './wishes-and-hopes/wishes-and-hopes.component';
import { ClosingRemarksComponent } from './closing-remarks/closing-remarks.component';
import { CommonModule } from '@angular/common';
import { AppIconName, IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, OpeningRemarksComponent, WiseWordsOrPrayerComponent, InvitationDetailsComponent, WishesAndHopesComponent, ClosingRemarksComponent, IconComponent ],
  template: `
    <main class="flex flex-col justify-center justify-items-stretch items-center snap-mandatory snap-y">

      <div class="snap-always snap-start" [id]="ids[0]" #openingRemarks>
        <app-opening-remarks [id]="ids[0] + 'Section'" [weddingDate]="weddingDate"></app-opening-remarks>
      </div>

      <div class="snap-always snap-start" [id]="ids[1]" #wiseWordsOrPrayer>
        <app-wise-words-or-prayer [id]="ids[1] + 'Section'"></app-wise-words-or-prayer>
      </div>

      <div class="snap-always snap-start" [id]="ids[2]" #invitationDetails>
        <app-invitation-details [id]="ids[2] + 'Section'" [weddingDate]="weddingDate" [weddingAddress]="weddingAddress" [weddingMapRouteLink]="weddingMapRouteLink"></app-invitation-details>
      </div>

      <div class="snap-always snap-start" [id]="ids[3]" #wishesAndHopes>
        <app-wishes-and-hopes [id]="ids[3] + 'Section'"></app-wishes-and-hopes>
      </div>

      <div class="snap-always snap-start" [id]="ids[4]" #closingRemarks>
        <app-closing-remarks [id]="ids[4] + 'Section'"></app-closing-remarks>
      </div>

      <!-- Scroller section -->
      <div class="fixed bottom-4 z-50">

        <div class="relative" [ngClass]="(this.showScrollerButton === true) ? 'scale-in' : 'scale-out'">

          <!-- Scroller Button -->
          <button type="button" role="button" class="scroll-button animate-bounce secondary-text-color" (click)="scrollToNextContent()">
            <app-icon [name]="appIconName" [size]="45" color="#999999"></app-icon>
          </button>

        </div>

      </div>

    </main>
  `,
  styles: ['.scale-out { -webkit-animation: scale-out .2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; animation: scale-out .2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; } .scale-in { -webkit-animation: scale-in .2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; animation: scale-in .2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; }']
})
// '.snap-scroller { height: 93vh; overflow-y: scroll; scroll-snap-type: y mandatory; section { scroll-snap-align: start; } }'
export class MainComponent implements AfterViewInit, OnDestroy {
  changeDetector = inject(ChangeDetectorRef)

  ids: Array<string> = [
    'openingRemarks',
    'wiseWordsOrPrayer',
    'invitationDetails',
    'wishesAndHopes',
    'closingRemarks',
  ];

  @ViewChild('openingRemarks') openingRemarksElement!: ElementRef;
  @ViewChild('wiseWordsOrPrayer') wiseWordsOrPrayerElement!: ElementRef;
  @ViewChild('invitationDetails') invitationDetailsElement!: ElementRef;
  @ViewChild('wishesAndHopes') wishesAndHopesElement!: ElementRef;
  @ViewChild('closingRemarks') closingRemarksElement!: ElementRef;

  currentSection: number = 0;

  showScrollerButton: boolean = false;
  scrollerVisibleClass: string = 'scale-out';
  appIconName: AppIconName = 'chevrons-down';

  intersectionObserver!: IntersectionObserver;

  // Wedding data
  weddingDate: Date = new Date('2024-12-2');
  weddingAddress: string = 'Desa Batursari, Kecamatan Candiroto, Kabupaten Temanggung, Provinsi Jawa Tengah';
  weddingMapRouteLink: string = 'https://maps.app.goo.gl/GbT94BjrzM8ggH5k9'; // 'https://maps.app.goo.gl/KNkUykG7v9uLY7B19?g_st=aw';

  ngAfterViewInit(): void {
    this.observeIntersections();
  }

  ngOnDestroy(): void {
    this.intersectionObserver.unobserve(this.openingRemarksElement.nativeElement);
    this.intersectionObserver.unobserve(this.wiseWordsOrPrayerElement.nativeElement);
    this.intersectionObserver.unobserve(this.invitationDetailsElement.nativeElement);
    this.intersectionObserver.unobserve(this.wishesAndHopesElement.nativeElement);
    this.intersectionObserver.unobserve(this.closingRemarksElement.nativeElement);
  }

  private observeIntersections() {
    const options = {
      root: null,
      threshold: 0.5 // Trigger when 50% of the section is visible
    };

    this.intersectionObserver = new IntersectionObserver((entries: any) => {
      entries.forEach((entry: any) => {

        if (entry.isIntersecting) {
          this.updateCurrentSection(entry.target);
        }

      });
    }, options);

    this.intersectionObserver.observe(this.openingRemarksElement.nativeElement);
    this.intersectionObserver.observe(this.wiseWordsOrPrayerElement.nativeElement);
    this.intersectionObserver.observe(this.invitationDetailsElement.nativeElement);
    this.intersectionObserver.observe(this.wishesAndHopesElement.nativeElement);
    this.intersectionObserver.observe(this.closingRemarksElement.nativeElement);

    this.changeDetector.detectChanges();
  }

  private updateCurrentSection(target: Element): void {

    switch (target) {

      case this.openingRemarksElement.nativeElement:
        this.currentSection = 0;
        break;

      case this.wiseWordsOrPrayerElement.nativeElement:
        this.currentSection = 1;
        break;

      case this.invitationDetailsElement.nativeElement:
        this.currentSection = 2;
        break;

      case this.wishesAndHopesElement.nativeElement:
        this.currentSection = 3;
        break;

      case this.closingRemarksElement.nativeElement:
        this.currentSection = 4;
        break;

      default:
        this.currentSection = 0;
        break;
    }

    // Show the scroll button if it's not the last section
    this.showScrollerButton = this.currentSection < 4;
    this.scrollerVisibleClass = (this.showScrollerButton) ? 'scale-in' : 'scale-out';
    this.appIconName = (this.currentSection === 4) ? 'chevrons-up' : 'chevrons-down';

    this.changeDetector.detectChanges();
  }

  public scrollToNextContent(): void {
    switch (this.currentSection) {

      case 0:
        this.wiseWordsOrPrayerElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 1:
        this.invitationDetailsElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 2:
        this.wishesAndHopesElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 3:
        this.closingRemarksElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

      //case 4:
      //  this.openingRemarksElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      //  break;

      default:
        this.openingRemarksElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

    }

    this.changeDetector.detectChanges();
  }

}
