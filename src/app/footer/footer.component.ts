import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="content-end py-5">
      <div class="container flex flex-row justify-between">
        <span class="fourth-text-color">Made with love, Dina & Ibnu.</span>
        <span class="fourth-text-color">&copy; 2024.</span>
      </div>
    </footer>
  `,
  styles: ``
})
export class FooterComponent { }
