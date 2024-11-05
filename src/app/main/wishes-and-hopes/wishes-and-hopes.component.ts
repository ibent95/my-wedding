import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrnamentComponent } from '../../shared/ornament/ornament.component';

@Component({
  selector: 'app-wishes-and-hopes',
  standalone: true,
  imports: [CommonModule, OrnamentComponent],
  templateUrl: './wishes-and-hopes.component.html',
  styles: ``
})
export class WishesAndHopesComponent {
  @Input() id: string = 'wishesAndHopes';
}
