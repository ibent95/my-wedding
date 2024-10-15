import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-closing-remarks',
  standalone: true,
  imports: [],
  templateUrl: './closing-remarks.component.html',
  styles: ['section { min-height: 96vh; }']
})
export class ClosingRemarksComponent {
  @Input() id: string = 'closingRemarks';
}
