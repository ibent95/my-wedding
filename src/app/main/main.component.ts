import { Component } from '@angular/core';
import { OpeningRemarksComponent } from './opening-remarks/opening-remarks.component';
import { WiseWordsOrPrayerComponent } from './wise-words-or-prayer/wise-words-or-prayer.component';
import { InvitationDetailsComponent } from './invitation-details/invitation-details.component';
import { WishesAndHopesComponent } from './wishes-and-hopes/wishes-and-hopes.component';
import { ClosingRemarksComponent } from './closing-remarks/closing-remarks.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, OpeningRemarksComponent, WiseWordsOrPrayerComponent, InvitationDetailsComponent, WishesAndHopesComponent, ClosingRemarksComponent ],
  template: `
    <main class="flex flex-col justify-center items-center gap-4">

      <app-opening-remarks></app-opening-remarks>

      <app-wise-words-or-prayer></app-wise-words-or-prayer>

      <app-invitation-details></app-invitation-details>

      <app-wishes-and-hopes></app-wishes-and-hopes>

      <app-closing-remarks></app-closing-remarks>

    </main>
  `,
  styles: []
})
export class MainComponent {

}
