import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpeningRemarksComponent } from "./main/opening-remarks/opening-remarks.component";
import { WiseWordsOrPrayerComponent } from "./main/wise-words-or-prayer/wise-words-or-prayer.component";
import { InvitationDetailsComponent } from "./main/invitation-details/invitation-details.component";
import { WishesAndHopesComponent } from "./main/wishes-and-hopes/wishes-and-hopes.component";
import { ClosingRemarksComponent } from "./main/closing-remarks/closing-remarks.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OpeningRemarksComponent, WiseWordsOrPrayerComponent, InvitationDetailsComponent, WishesAndHopesComponent, ClosingRemarksComponent, HeaderComponent, FooterComponent, MainComponent],
  template: `
    <app-header></app-header>

    <app-main></app-main>

    <app-footer></app-footer>
  `,
  styles: ``
})
export class AppComponent {
  title = 'my-wedding';
}
