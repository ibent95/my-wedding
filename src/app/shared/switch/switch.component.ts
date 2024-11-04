import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="switch">
      <input type="checkbox" checked>
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

    //.slider {
    //  position: absolute;
    //  cursor: pointer;
    //  top: 0;
    //  left: 0;
    //  right: 0;
    //  bottom: 0;
    //  background-color: var(--primary-color);
    //  border: solid var(--third-color);
    //  -webkit-transition: .4s;
    //  -ms-transition: .4s;
    //  transition: .4s;
    //}

    //.slider:before {
    //  position: absolute;
    //  content: "";
    //  height: 26px;
    //  width: 26px;
    //  left: 1.5px;
    //  bottom: 1.5px;
    //  background-color: var(--fourth-color);
    //  -webkit-transition: .4s;
    //  -ms-transition: .4s;
    //  transition: .4s;
    //}

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
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px; /* Slightly smaller than the slider height */
      width: 26px; /* Slightly smaller than the slider width */
      left: 2px; /* Positioned within slider */
      top: 50%; /* Centered vertically */
      transform: translateY(-50%); /* Aligns center vertically */
      background-color: var(--fourth-color);
      border-radius: 50%; /* Makes it circular */
      transition: .4s;
    }

    input:checked + .slider {
      background-color: var(--primary-color);
    }

    input:focus + .slider {
      box-shadow: 0 0 1px var(--primary-color);
    }

    //input:checked + .slider:before {
    //  -webkit-transform: translateX(26px);
    //  -ms-transform: translateX(26px);
    //  transform: translateX(26px);
    //}

    input:checked + .slider:before {
      -webkit-transform: translateX(26px, -50%);
      -ms-transform: translateX(26px, -50%);
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
  @Input() data!: boolean;
}
