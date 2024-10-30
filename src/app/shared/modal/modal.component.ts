import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="modal-backdrop" (click)="close()" #modalBackdrop></div>
    }

    @if (isOpen) {
      <div class="modal-content border w-[80vw] h-fit mobile:w-screen" #modalContent>
        <button class="close-button text-xl" (click)="close()">&times;</button>

        <ng-content></ng-content>

        <div class="flex flex-col">
          <button class="appearance-none rounded-lg outline-double transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 m-4 p-3 self-center" (click)="close()">Kembali</button>
        </div>
      </div>
    }
  `,
  styles: `
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10;
    }

    .modal-content {
      position: fixed;
      top: 50%;
      left: 50%;
      background: var(--primary-color);
      padding: 20px;
      border-radius: 8px;
      //width: 80vw;          // Adjust width as needed
      //height: fit-content;  // Adjust height as needed
      max-width: 100vw;     // Maximum width of the modal
      max-height: 100vh;    // Maximum height of the modal
      overflow-y: auto;     // Enable vertical scrolling

      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

      z-index: 11;
    }

    .close-button {
      position: absolute;
      top: 15px;
      right: 10px;
      //background: none;
      //border: none;
      //font-size: 18px;
      cursor: pointer;
    }
  `
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContentElement!: ElementRef;
  private renderer: Renderer2 = inject(Renderer2);

  @Input() isOpen = false;
  @Input() color!: string;

  providerColor!: any;

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>(true);

  ngOnInit(): void {
    if (this.color) {
      this.providerColor = this.provideColorFromInput(this.color);
    }
  }

  ngAfterViewInit(): void {
    if (this.providerColor) {
      this.renderer?.setAttribute(
        this.modalContentElement.nativeElement,
        'fill',
        this.providerColor.toString()
      );
    }
  }

  ngOnDestroy(): void {
    this.onClose.unsubscribe();
  }

  private provideColorFromInput(color: string): string {
    let results: string;

    switch (color) {
      case 'primary':
      case 'secondary':
      case 'third':
      case 'fourth':
      case 'primary-inverse':
      case 'secondary-inverse':
      case 'third-inverse':
      case 'fourth-inverse':
        results = `var(--${color}-text-color)`;
        break;

      default:
        results = color;
        break;
    }

    return results;
  }

  public close(): void {
    this.isOpen = false;
    this.onClose.next({
      close: true,
      open: false
    });
  }

}
