import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, } from '@angular/core';

export type AppIconName =
  'copy-alt' |
  'up-arrow-alt' |
  'up-arrow-circle' |
  'chevrons-up' |
  'down-arrow-alt' |
  'down-arrow-circle' |
  'chevrons-down' |
  'map' |
  'map-alt' |
  'copy' |
  'copy-alt' |
  'copy-alt-solid' |
  'play-circle' |
  'pause-circle' |
  'stop-circle'
;

export type AppIconColor =
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
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styles: ``
})
export class IconComponent implements OnInit {

  @Input() name!: AppIconName;
  @Input() class!: string;
  @Input() size: number = 24;
  @Input() color!: AppIconColor | string;
  @Input() ariaLabel!: string;

  providerColor!: string;

  ngOnInit(): void {
    this.providerColor = this.provideColorFromInput(this.color);
  }

  private provideColorFromInput(color: AppIconColor | string): string {
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

}
