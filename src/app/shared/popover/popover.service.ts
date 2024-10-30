// popover.service.ts
import { Injectable } from '@angular/core';
import { PopoverComponent } from './popover.component';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  private activePopoverId: number | null = null;

  registerPopover(id: number, popover: PopoverComponent) {
    // Close any previously active popover when a new one is opened
    if (this.activePopoverId !== id && this.activePopoverId !== null) {
      popover.closePopover();
    }
    this.activePopoverId = id;
  }

  togglePopover(id: number, popover: PopoverComponent) {
    if (this.activePopoverId === id) {
      popover.closePopover();
      this.activePopoverId = null;
    } else {
      this.registerPopover(id, popover);
      popover.isOpen = !popover.isOpen;
    }
  }

  closeActivePopover() {
    this.activePopoverId = null;
  }
}
