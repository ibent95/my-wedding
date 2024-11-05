import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="switch">
      <input type="checkbox" [id]="switchId" checked>
      <span class="slider round"></span>
    </label>
  `,
  styles: `
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--primary-color);
      border: 2px solid var(--third-color); /* Adjusted border size */
      border-radius: 34px; /* Ensures the slider is round */
      -webkit-transition: .4s;
      -ms-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px; /* Slightly smaller than the slider height */
      width: 26px; /* Slightly smaller than the slider width */
      left: 2px; /* Positioned within slider */
      top: 50%; /* Centered vertically */
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%); /* Aligns center vertically */
      background-color: var(--fourth-color);
      border-radius: 50%; /* Makes it circular */
      -webkit-transition: .4s;
      -ms-transition: .4s;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: var(--primary-color);
    }

    input:focus + .slider {
      box-shadow: 0 0 1px var(--primary-color);
    }

    input:checked + .slider:before {
      -webkit-transform: translate(26px, -50%);
      -ms-transform: translate(26px, -50%);
      transform: translate(26px, -50%); /* Move ball to the right */
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  `
})
export class SwitchComponent {

  private utilsSvc: UtilsService = inject(UtilsService);
  @Input() data!: boolean;

  switchId!: string;

  constructor() {
    this.switchId = this.utilsSvc.generateId();
  }

}
