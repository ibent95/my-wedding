import { Component, Input } from '@angular/core';
import { OrnamentComponent } from '../../shared/ornament/ornament.component';

@Component({
  selector: 'app-wishes-and-hopes',
  standalone: true,
  imports: [OrnamentComponent],
  templateUrl: './wishes-and-hopes.component.html',
  styles: []
})
export class WishesAndHopesComponent {
  @Input() id: string = 'wishesAndHopes';
}
