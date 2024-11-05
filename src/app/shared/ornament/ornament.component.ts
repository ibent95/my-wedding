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

export type AppOrnamentColor =
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
  selector: 'app-ornament',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ornament.component.html',
  styles: [':ng-deep svg { min-width: 100% !important; width: auto !important; height: auto !important; }']
})
export class OrnamentComponent implements OnInit, AfterViewInit {

  @ViewChild('ornament', { static: true }) ornamentElement!: ElementRef;
  private renderer: Renderer2 = inject(Renderer2);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() type: AppOrnamentType = 'ornament-1';
  @Input() position: AppOrnamentPosition = 'bottom-center';
  @Input() class!: string;
  @Input() width!: string;
  @Input() height!: string;
  @Input() color!: AppOrnamentColor | string;
  @Input() ariaLabel!: string;

  sanitizedHTML!: SafeHtml;
  providerClass!: any;
  providerWidth!: any;
  providerHeight!: any;
  providerColor!: any;
  providerAriaLabel!: any;

  ngOnInit(): void {

    if (this.class) {
      this.providerClass = this.class;
    }

    if (this.providerClass || this.width) {
      this.providerWidth = this.provideWidthFromInput(this.width, this.height);
    }

    if (this.providerClass || this.height) {
      this.providerHeight = this.provideHeightFromInput(this.height, this.width);
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

  private provideWidthFromInput(width: string | null, height: string | null): string | null {
    let results: 'auto' | string | null = width || null;
    const classWidthCondition: boolean =
      this.class.includes('h-') ||
      this.class.includes('min-h-');

    if ((!width && height) || classWidthCondition) {
      results = '100%';
    }

    return results;
  }

  private provideHeightFromInput(height: string | null, width: string | null): string | null {
    let results: 'auto' | string | null = height || null;
    const classHeightCondition: boolean =
      this.class.includes('w-') ||
      this.class.includes('min-w-');

    if ((!height && width) || classHeightCondition) {
      results = '100%';
    }

    return results;
  }

  private provideColorFromInput(color: AppOrnamentColor | string): string {
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

  private initiateSvg() {
    this.loadSvg(`/assets/images/${this.type}-${this.position}.svg`).then((svg: any) => {
      this.sanitizedHTML = this.sanitizer.bypassSecurityTrustHtml(svg);

      this.changeDetector.detectChanges();

      // Now you can manipulate the SVG as it's inline
      const element = this.ornamentElement.nativeElement?.querySelector('svg');

      if (element && this.providerClass) {
        this.renderer?.setAttribute(element, 'class', this.providerClass.toString());
      }

      if (element && this.providerWidth) {
        this.renderer?.setAttribute(element, 'width', this.providerWidth.toString());
      }

      if (element && this.providerHeight) {
        this.renderer?.setAttribute(element, 'height', this.providerHeight.toString());
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
