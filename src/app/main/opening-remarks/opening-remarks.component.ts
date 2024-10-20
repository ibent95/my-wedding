import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opening-remarks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opening-remarks.component.html',
  styles: ["section { border: 8px double var(--third-color); border-radius: 1rem; }"]
})
export class OpeningRemarksComponent {
  @Input() id: string = 'openingRemarks';
  @Input() weddingDate: Date = new Date('2024-12-2');
}
