import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './audio-player.component.html',
  styles: ``
})
export class AudioPlayerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef; // Access to the audio element
  @ViewChild('play') playElement!: ElementRef; // Access to the play control element
  @ViewChild('pause') pauseElement!: ElementRef; // Access to the pause control element
  @ViewChild('stop') stopElement!: ElementRef; // Access to the stop control element
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private domSanitizer: DomSanitizer = inject(DomSanitizer);

  @Input() source: string = '/assets/audios/Raissa_Anggiani_-_Benih.mp3';
  @Input() playMusic: boolean = false;
  @Input() autoplay: boolean = true;
  @Input() muted: boolean = false;
  @Input() loop: boolean = true;

  safeSilenceSource!: SafeResourceUrl;
  safeSource!: SafeResourceUrl;
  state: 'playing' | 'paused' | 'stopped' = 'stopped';
  currentTime: number = 0;
  displayedCurrentTime: string = '00:00';
  showPlayPrompt = false; // Controls visibility of the play prompt
  debugText!: string;

  @Output() onPlaying: EventEmitter<any> = new EventEmitter<any>();
  @Output() isPlayed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isPaused: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isStopped: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.safeSilenceSource = this.domSanitizer.bypassSecurityTrustResourceUrl('https://ia800206.us.archive.org/16/items/SilentRingtone/silence_64kb.mp3');
    this.safeSource = this.domSanitizer.bypassSecurityTrustResourceUrl(this.source);
  }

  ngAfterViewInit(): void {
    //this.audioPlayer.nativeElement.muted = this.muted; // Set muted initially
    this.audioPlayer.nativeElement.autoplay = this.autoplay; // Set muted initially
    this.audioPlayer.nativeElement.loop = this.loop; // Set muted initially

    this.debugText = ` ${this.audioPlayer.nativeElement.muted} | ${this.audioPlayer.nativeElement.autoplay} | ${this.audioPlayer.nativeElement.loop} `

    //window.addEventListener('scroll', this.playAudio.bind(this), { once: true });
    if (this.autoplay) {
      this.playAudio();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.audioPlayer?.nativeElement && changes['playMusic']) {
      this.playAudio();
    }

    if (this.audioPlayer?.nativeElement && changes['autoplay']) {
      this.playAudio();
    }

  }

  ngOnDestroy() {
    // Clean up the event listener
    window.removeEventListener('scroll', this.onFirstScroll.bind(this));
  }

  onFirstScroll() {
    // Show the play prompt when scroll is detected
    this.showPlayPrompt = true;
  }

  // Play audio
  playAudio() {
    this.audioPlayer.nativeElement.muted = false;

    this.audioPlayer.nativeElement.play().then(() => {
      this.audioPlayer.nativeElement.muted = false; // Unmute
    }).catch((error: any) => {
      console.warn("The audio failed to start, user interaction is required.", error);
      this.state = 'stopped';
    });

    this.state = 'playing';
    this.isPlayed.next(true);
  }

  // Pause audio
  pauseAudio() {
    this.audioPlayer.nativeElement.pause();

    this.state = 'paused';
    this.isPaused.next(true);
  }

  // Stop audio
  stopAudio() {
    this.audioPlayer.nativeElement.pause();

    this.audioPlayer.nativeElement.currentTime = 0; // Reset to the beginning
    this.state = 'stopped';
    this.isStopped.next(true);
  }

  // Update current time
  onTimeUpdate(event: Event) {

    this.currentTime = (event.target as HTMLAudioElement).currentTime;

    // Set displad current time in string
    const minutes = Math.floor(this.currentTime / 60);
    const secs = Math.floor(this.currentTime % 60);

    this.displayedCurrentTime = `${this.padZero(minutes)}:${this.padZero(secs)}`;

    this.changeDetector.detectChanges();

    this.onPlaying.next({ currentTime: this.currentTime });

  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // Event when audio starts playing
  onPlay() {
    this.state = 'playing';
  }

  // Event when audio is paused
  onPause() {
    this.state = 'paused';
  }

}
