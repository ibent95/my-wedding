import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opening-remarks',
  standalone: true,
  imports: [],
  templateUrl: './opening-remarks.component.html',
  styles: ["section { min-width: 91vw; border: 8px double var(--third-color); border-radius: 1rem; }"]
})
export class OpeningRemarksComponent {
  @Input() id: string = 'openingRemarks';
}
