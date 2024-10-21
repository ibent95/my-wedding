import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type AppOrnamentType =
  'ornament-1' |
  'ornament-2'
;

export type AppOrnamentPosition =
  'top-left' |
  'top-center' |
  'top-right' |
  'middle-left' |
  'middle-center' |
  'middle-right' |
  'bottom-left' |
  'bottom-center' |
  'bottom-right'
;

export type AppOrnamentColor = 'primary' | 'secondary' | 'third' | 'fourth';

@Component({
  selector: 'app-ornament',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ornament.component.html',
  styles: [':ng-deep svg { min-width: 100% !important; }']
})
export class OrnamentComponent implements OnInit, AfterViewInit {
  @ViewChild('ornament', { static: true }) ornamentElement!: ElementRef;
  private renderer: Renderer2 = inject(Renderer2);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() type: AppOrnamentType = 'ornament-1';
  @Input() position: AppOrnamentPosition = 'bottom-center';
  @Input() class!: string;
  @Input() width!: number;
  @Input() color!: AppOrnamentColor | string;
  @Input() ariaLabel!: string;

  sanitizedHTML!: SafeHtml;
  providerClass!: any;
  providerWidth!: any;
  providerColor!: any;
  providerAriaLabel!: any;

  ngOnInit(): void {

    if (this.class) {
      this.providerClass = this.class;
    }

    if (this.width) {
      this.providerWidth = this.width;
    }

    if (this.color) {
      this.providerColor = this.provideColorFromInput(this.color);
    }

    if (this.ariaLabel) {
      this.providerAriaLabel = this.ariaLabel;
    }

  }

  ngAfterViewInit(): void {
    this.initiateSvg();
  }

  private provideColorFromInput(color: AppOrnamentColor | string): string {
    let results: string;

    switch (color) {
      case 'primary':
      case 'secondary':
      case 'third':
      case 'fourth':
        results = `var(--${color}-color)`;
        break;

      default:
        results = color;
        break;
    }

    return results;
  }

  private initiateSvg() {
    this.loadSvg(`/assets/images/${this.type}-${this.position}.svg`).then((svg: any) => {
      this.sanitizedHTML = this.sanitizer.bypassSecurityTrustHtml(svg);
      //this.ornamentElement.nativeElement.innerHTML = this.sanitizedHTML; // Not used anymore

      this.changeDetector.detectChanges();

      // Now you can manipulate the SVG as it's inline
      const element = this.ornamentElement.nativeElement?.querySelector('svg');

      if (element && this.providerWidth) {
        this.renderer?.setAttribute(element, 'width', this.providerWidth.toString());
      }

      if (element && this.providerColor) {
        this.renderer?.setAttribute(element, 'fill', this.providerColor.toString());
      }

      if (element && this.providerAriaLabel) {
        this.renderer?.setAttribute(element, 'attr.aria-label', this.providerAriaLabel.toString());
      }

      this.changeDetector.detectChanges();

    });
  }

  private loadSvg(url: string): Promise<string> {
    return fetch(url).then((response) => response.text());
  }

}
