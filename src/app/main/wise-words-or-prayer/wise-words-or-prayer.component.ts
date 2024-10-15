import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wise-words-or-prayer',
  standalone: true,
  imports: [],
  templateUrl: './wise-words-or-prayer.component.html',
  styles: []
})
export class WiseWordsOrPrayerComponent {
  @Input() id: string = 'wiseWordsOrPrayer';
}
