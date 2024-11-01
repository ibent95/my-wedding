import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './audio-player.component.html',
  styles: ``
})
export class AudioPlayerComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef; // Access to the audio element
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() source: string = '/assets/audios/Raissa_Anggiani_-_Benih.mp3';
  @Input() autoplay: boolean = false;
  @Input() muted: boolean = false;
  @Input() loop: boolean = false;

  audioGranted: boolean = false;
  state: 'playing' | 'paused' | 'stopped' = 'stopped';
  currentTime: number = 0;
  displayedCurrentTime: string = '00:00';

  @Output() onPlaying: EventEmitter<any> = new EventEmitter<any>();
  @Output() isPlayed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isPaused: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isStopped: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {

    console.log('autoplay', this.autoplay);

    this.requestAudioPermission();

  }

  ngAfterViewInit(): void {

    if (this.audioGranted) {
      this.audioPlayer.nativeElement.muted = this.muted; // Set muted initially

      if (this.autoplay) {
        this.playAudio();
      }
    } else {
      this.autoplay = false;
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    console.log('audioGranted', this.audioGranted);

    if (this.audioGranted) {

      if (changes['autoplay']) {
        this.playAudio();
      }

    }
  }

  public requestAudioPermission(): void {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream: any) => {
        console.log("Audio permission granted.", this.autoplay, stream);
        // You can do something with the audio stream here
        this.audioGranted = true;

        if (this.autoplay) {
          console.log('autoplay true');
          this.playAudio();
        }
      })
      .catch((error) => {
        console.error("Audio permission denied.", error);
        alert("Please allow audio access for the best experience.");
        this.audioGranted = false;
      });
  }

  // Play audio
  playAudio() {
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
    //console.log('Audio started playing');
  }

  // Event when audio is paused
  onPause() {
    //console.log('Audio paused');
  }

}
