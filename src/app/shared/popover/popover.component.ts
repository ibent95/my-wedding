import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, inject, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="popover-content" (click)="togglePopover($event)" #popoverContent>
        <ng-content></ng-content>
      </div>
    }
  `,
  styles: `
    .popover-content {
      position: absolute;
      background-color: var(--primary-color);
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      width: fit-content;
      top: 50%; /* Position below the trigger element */
      left: 50%;
      transform: translateX(-50%);
    }
  `
})
export class PopoverComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('popoverContent', { static: false }) popoverContent!: ElementRef;
  private renderer: Renderer2 = inject(Renderer2);

  @Input() isOpen: boolean = false;
  @Input() duration: number = 5000;

  private timeout!: any;

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>(true);

  ngOnInit(): void {
    console.log('isOpen',this.isOpen);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes['isOpen']?.currentValue) {
      this.isOpen = changes['isOpen'].currentValue;
    }

    if (this.isOpen) {
      this.initiatePopover(this.duration);
    }
  }

  ngOnDestroy(): void {
    this.onClose.unsubscribe();
  }

  private initiatePopover(duration: number): void {
    this.timeout = setTimeout(() => this.togglePopover(), duration);
  }

  //@HostListener('document:click', ['$event'])
  //public onDocumentClick(event: Event): void {
  //  console.log('documentClick');
  //  this.isOpen = false;
  //  this.onClose.next({
  //    close: true,
  //    open: false
  //  });
  //}

  public togglePopover(event?: Event, triggerElement?: HTMLElement): void {
    console.log('togglePopover');
    event?.stopPropagation();
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      const triggerRect = triggerElement?.getBoundingClientRect();
      const popoverHeight = this.popoverContent?.nativeElement.offsetHeight;

      if (triggerRect) {
        this.renderer.setStyle(
          this.popoverContent.nativeElement,
          'top',
          `${triggerRect.top - popoverHeight}px`
        );

        this.renderer.setStyle(
          this.popoverContent.nativeElement,
          'left',
          `${triggerRect.left + triggerRect.width / 2}px`
        );
      }
    }

    if (!this.isOpen) {
      clearTimeout(this.timeout);

      this.onClose.next({
        close: true,
        open: false
      });
    }

  }

}