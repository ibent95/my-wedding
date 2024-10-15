import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invitation-details',
  standalone: true,
  imports: [],
  templateUrl: './invitation-details.component.html',
  styles: []
})
export class InvitationDetailsComponent {
  @Input() id: string = 'invitationDetails';
}
