import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { OrnamentComponent } from '../../shared/ornament/ornament.component';

@Component({
  selector: 'app-invitation-details',
  standalone: true,
  imports: [CommonModule, OrnamentComponent, IconComponent],
  templateUrl: './invitation-details.component.html',
  styles: ``
})
export class InvitationDetailsComponent {
  @Input() id: string = 'invitationDetails';
  @Input() weddingDate: Date = new Date('2024-12-2');
  @Input() weddingAddress!: string;
  @Input() weddingMapRouteLink!: string;
}
