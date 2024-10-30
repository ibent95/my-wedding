import { Component, Input } from '@angular/core';
import { OrnamentComponent } from "../../shared/ornament/ornament.component";
import { CommonModule, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, OrnamentComponent],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.scss',
  providers: [{ provide: IMAGE_CONFIG, useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true } }],
})
export class GaleryComponent {
  @Input() id: string = 'galery';
}
