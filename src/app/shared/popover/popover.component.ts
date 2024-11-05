import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, inject, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

export type AppPopoverColor =
  'primary' |
  'secondary' |
  'third' |
  'fourth' |
  'primary-inverse' |
  'secondary-inverse' |
  'third-inverse' |
  'fourth-inverse'
;

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="popover-content primary-color rounded-xl outline-double outline-[var(--fourth-color)]"
        (click)="stopEvent($event)" [id]="elementId" #popoverContent>
        <ng-content></ng-content>
      </div>
      <!-- (click)="togglePopover($event)" -->
    }
  `,
  styles: `
    .popover-content {
      position: absolute;
      padding: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      width: fit-content;
      top: 50%; /* Position below the trigger element */
      left: 50%;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  `
})
export class PopoverComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('popoverContent', { static: false }) popoverContent!: ElementRef;
  private utilsSvc: UtilsService = inject(UtilsService);
  private renderer: Renderer2 = inject(Renderer2);

  @Input() isOpen: boolean = false;
  @Input() duration: number = 5000;
  @Input() color: AppPopoverColor | string = 'primary-inverse';

  private timeoutId!: any;
  elementId!: string;
  providerColor!: any;

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>(true);

  ngOnInit(): void {
    this.elementId = this.utilsSvc.generateId();
    this.providerColor = this.provideColorFromInput(this.color);
  }

  ngAfterViewInit(): void {
    if (this.isOpen) {
      this.togglePopover(true);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      const isOpenNow = changes['isOpen'].currentValue;
      this.togglePopover(isOpenNow);
    }
  }

  ngOnDestroy(): void {
    this.clearCloseTimeout();
    this.onClose.complete();
  }

  private provideColorFromInput(color: AppPopoverColor | string): string {
    switch (color) {
      case 'primary':
      case 'secondary':
      case 'third':
      case 'fourth':
      case 'primary-inverse':
      case 'secondary-inverse':
      case 'third-inverse':
      case 'fourth-inverse':
        return `var(--${color}-text-color)`;
      default:
        return color;
    }
  }

  private togglePopover(shouldOpen: boolean): void {
    this.clearCloseTimeout();
    this.isOpen = shouldOpen;

    if (this.isOpen) {
      this.setPopoverStyle();
      this.timeoutId = setTimeout(() => this.closePopover(), this.duration);
    }
  }

  private setPopoverStyle(): void {
    if (this.popoverContent?.nativeElement && this.providerColor) {
      this.renderer.setStyle(this.popoverContent.nativeElement, 'background-color', this.providerColor);
    }
  }

  public closePopover(): void {
    this.isOpen = false;
    this.clearCloseTimeout();
    this.onClose.emit();
  }

  private clearCloseTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  public stopEvent(event: Event): void {
    event.stopPropagation();
    this.closePopover();
  }

}
