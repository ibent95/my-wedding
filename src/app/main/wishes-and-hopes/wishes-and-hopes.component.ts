import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wishes-and-hopes',
  standalone: true,
  imports: [],
  templateUrl: './wishes-and-hopes.component.html',
  styles: []
})
export class WishesAndHopesComponent {
  @Input() id: string = 'wishesAndHopes';
}
