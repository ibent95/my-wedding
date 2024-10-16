import { Component } from '@angular/core';
import { OpeningRemarksComponent } from './opening-remarks/opening-remarks.component';
import { WiseWordsOrPrayerComponent } from './wise-words-or-prayer/wise-words-or-prayer.component';
import { InvitationDetailsComponent } from './invitation-details/invitation-details.component';
import { WishesAndHopesComponent } from './wishes-and-hopes/wishes-and-hopes.component';
import { ClosingRemarksComponent } from './closing-remarks/closing-remarks.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, OpeningRemarksComponent, WiseWordsOrPrayerComponent, InvitationDetailsComponent, WishesAndHopesComponent, ClosingRemarksComponent, IconComponent ],
  template: `
    <main class="flex flex-col justify-center items-center">

      <app-opening-remarks [id]="ids[0]"></app-opening-remarks>

      <div class="flex items-center justify-center">
        <a class="" [href]="'#' + ids[1]">
          <i class="antialiased text-4xl" aria-label="Navigate down"></i>
          <app-icon name="chevrons-down" [size]="45" color="third"></app-icon>
        </a>
      </div>

      <app-wise-words-or-prayer [id]="ids[1]"></app-wise-words-or-prayer>

      <div class="flex items-center justify-center">
        <a class="" [href]="'#' + ids[2]">
          <app-icon name="chevrons-down" [size]="45" color="third"></app-icon>
        </a>
      </div>

      <app-invitation-details [id]="ids[2]"></app-invitation-details>

      <div class="flex items-center justify-center">
        <a class="" [href]="'#' + ids[3]">
          <app-icon name="chevrons-down" [size]="45" color="third"></app-icon>
        </a>
      </div>

      <app-wishes-and-hopes [id]="ids[3]"></app-wishes-and-hopes>

      <div class="flex items-center justify-center">
        <a class="" [href]="'#' + ids[4]">
          <app-icon name="chevrons-down" [size]="45" color="third"></app-icon>
        </a>
      </div>

      <app-closing-remarks [id]="ids[4]"></app-closing-remarks>

    </main>
  `,
  styles: []
})
export class MainComponent {

  ids: Array<string> = [
    'openingRemarks',
    'wiseWordsOrPrayer',
    'invitationDetails',
    'wishesAndHopes',
    'closingRemarks',
  ];

}
