import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styles: `
    .header {
      transition: opacity 0.5s ease;
    }

    .header.hidden {
      opacity: 0;
      pointer-events: none; /* Prevents interaction when hidden */
    }

    .header.visible {
      opacity: 1;
    }
  `
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAtTop = true;
  private scrollSubject: Subject<number> = new Subject<number>();

  ngOnInit() {
    this.scrollSubject.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(scrollPosition => {
      this.isAtTop = scrollPosition === 0;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrollSubject.next(scrollPosition);
  }

  ngOnDestroy() {
    this.scrollSubject.unsubscribe();
  }

}
