import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpeningRemarksComponent } from './opening-remarks/opening-remarks.component';
import { WiseWordsOrPrayerComponent } from './wise-words-or-prayer/wise-words-or-prayer.component';
import { InvitationDetailsComponent } from './invitation-details/invitation-details.component';
import { WishesAndHopesComponent } from './wishes-and-hopes/wishes-and-hopes.component';
import { ClosingRemarksComponent } from './closing-remarks/closing-remarks.component';
import { CommonModule } from '@angular/common';
import { AppIconName, IconComponent } from '../shared/icon/icon.component';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, OpeningRemarksComponent, WiseWordsOrPrayerComponent, InvitationDetailsComponent, WishesAndHopesComponent, ClosingRemarksComponent, IconComponent ],
  template: `
    <main class="flex flex-col justify-center items-center snap-scroller">

      <div #openingRemarks>
        <app-opening-remarks [id]="ids[0]"></app-opening-remarks>
      </div>

      <div #wiseWordsOrPrayer>
        <app-wise-words-or-prayer [id]="ids[1]"></app-wise-words-or-prayer>
      </div>

      <div #invitationDetails>
        <app-invitation-details [id]="ids[2]"></app-invitation-details>
      </div>

      <div #wishesAndHopes>
        <app-wishes-and-hopes [id]="ids[3]"></app-wishes-and-hopes>
      </div>

      <div #closingRemarks>
        <app-closing-remarks [id]="ids[4]"></app-closing-remarks>
      </div>

      <div class="fixed bottom-4">

        <div class="relative" [ngClass]="(this.showScrollerButton === true) ? 'scale-in' : 'scale-out'">

          <a class="cursor-pointer" (click)="scrollToNextContent()">
            <app-icon [app-name]="appIconName" [size]="45" color="third"></app-icon>
          </a>

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
