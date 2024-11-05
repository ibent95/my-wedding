import { Component, Input } from '@angular/core';
import { OrnamentComponent } from '../../shared/ornament/ornament.component';

@Component({
  selector: 'app-wise-words-or-prayer',
  standalone: true,
  imports: [OrnamentComponent],
  templateUrl: './wise-words-or-prayer.component.html',
  styles: ``
})
export class WiseWordsOrPrayerComponent {
  @Input() id: string = 'wiseWordsOrPrayer';
}
