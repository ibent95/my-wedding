import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpeningRemarksComponent } from './opening-remarks/opening-remarks.component';
import { WiseWordsOrPrayerComponent } from './wise-words-or-prayer/wise-words-or-prayer.component';
import { InvitationDetailsComponent } from './invitation-details/invitation-details.component';
import { WishesAndHopesComponent } from './wishes-and-hopes/wishes-and-hopes.component';
import { ClosingRemarksComponent } from './closing-remarks/closing-remarks.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AppIconName, IconComponent } from '../shared/icon/icon.component';
import { SwitchComponent } from "../shared/switch/switch.component";
import { GaleryComponent } from "./galery/galery.component";
import { AudioPlayerComponent } from "../shared/audio-player/audio-player.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, OpeningRemarksComponent, WiseWordsOrPrayerComponent, InvitationDetailsComponent, GaleryComponent, WishesAndHopesComponent, ClosingRemarksComponent, SwitchComponent, IconComponent, AudioPlayerComponent],
  templateUrl: './main.component.html',
  styles: ['.scale-out { -webkit-animation: scale-out .2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; animation: scale-out .2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; } .scale-in { -webkit-animation: scale-in .2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; animation: scale-in .2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both; }']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private document: Document = inject(DOCUMENT);
  private changeDetector = inject(ChangeDetectorRef)

  @Input() isWelcomeClosed: boolean = false;

  lightTheme: boolean = false;

  ids: Array<string> = [
    'openingRemarks',
    'wiseWordsOrPrayer',
    'invitationDetails',
    'galery',
    'wishesAndHopes',
    'closingRemarks',
  ];

  @ViewChild('openingRemarks') openingRemarksElement!: ElementRef;
  @ViewChild('wiseWordsOrPrayer') wiseWordsOrPrayerElement!: ElementRef;
  @ViewChild('invitationDetails') invitationDetailsElement!: ElementRef;
  @ViewChild('galery') galeryElement!: ElementRef;
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.observeIntersections();
  }

  ngOnDestroy(): void {
    this.intersectionObserver.unobserve(this.openingRemarksElement.nativeElement);
    this.intersectionObserver.unobserve(this.wiseWordsOrPrayerElement.nativeElement);
    this.intersectionObserver.unobserve(this.invitationDetailsElement.nativeElement);
    this.intersectionObserver.unobserve(this.galeryElement.nativeElement);
    this.intersectionObserver.unobserve(this.wishesAndHopesElement.nativeElement);
    this.intersectionObserver.unobserve(this.closingRemarksElement.nativeElement);
  }

  requestAudioPermission() {
    navigator.mediaDevices.getUserMedia({ audio: true, })
      .then((stream) => {
        console.log("Audio permission granted.");
        // You can do something with the audio stream here
      })
      .catch((error) => {
        console.error("Audio permission denied.", error);
        alert("Please allow audio access for the best experience.");
      });
  }

  public changeTheme(data: boolean = false): void {
    this.lightTheme = data;

    // Change the theme to light theme
    if (data) {
      this.document.body.classList.add('light-theme');
      this.document.body.classList.remove('dark-theme');
    }

    // Change the theme to dark theme
    if (!data) {
      this.document.body.classList.add('dark-theme');
      this.document.body.classList.remove('light-theme');
    }

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
    this.intersectionObserver.observe(this.galeryElement.nativeElement);
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

      case this.galeryElement.nativeElement:
        this.currentSection = 3;
        break;

      case this.wishesAndHopesElement.nativeElement:
        this.currentSection = 4;
        break;

      case this.closingRemarksElement.nativeElement:
        this.currentSection = 5;
        break;

      default:
        this.currentSection = 0;
        break;
    }

    // Show the scroll button if it's not the last section
    this.showScrollerButton = this.currentSection < 5;
    this.scrollerVisibleClass = (this.showScrollerButton) ? 'scale-in' : 'scale-out';
    this.appIconName = (this.currentSection === 5) ? 'chevrons-up' : 'chevrons-down';

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
        this.galeryElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 3:
        this.wishesAndHopesElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 4:
        this.closingRemarksElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

      default:
        this.openingRemarksElement.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        break;

    }

    this.changeDetector.detectChanges();
  }

}
