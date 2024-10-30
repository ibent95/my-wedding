import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './audio-player.component.html',
  styles: ``
})
export class AudioPlayerComponent implements AfterViewInit {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef; // Access to the audio element
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() source: string = '/assets/audios/Raissa_Anggiani_-_Benih.mp3';
  @Input() autoplay: boolean = false;

  state: 'playing' | 'paused' | 'stopped' = 'stopped';
  currentTime: number = 0;
  displayedCurrentTime: string = '00:00';

  @Output() onPlaying: EventEmitter<any> = new EventEmitter<any>();
  @Output() isPlayed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isPaused: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isStopped: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngAfterViewInit(): void {
    if (this.autoplay) {
      this.playAudio();
    }
  }

  // Play audio
  playAudio() {
    this.audioPlayer.nativeElement.play();
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
    console.log('time', (event.target as HTMLAudioElement).currentTime);

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
