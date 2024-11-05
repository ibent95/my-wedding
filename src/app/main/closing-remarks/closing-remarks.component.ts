import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PopoverComponent } from '../../shared/popover/popover.component';
import { OrnamentComponent } from "../../shared/ornament/ornament.component";

export type BankAccount = {
  bankName: string,
  bankAccountName: string,
  bankAccountNumber: string,
};

@Component({
  selector: 'app-closing-remarks',
  standalone: true,
  imports: [IconComponent, ModalComponent, PopoverComponent, OrnamentComponent],
  templateUrl: './closing-remarks.component.html',
  styles: ``,
})
export class ClosingRemarksComponent implements OnInit {

  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() id: string = 'closingRemarks';
  @Input() bankAccounts: Array<BankAccount> = [
    {
      bankName: 'Bank Syariah Indonesia (BSI)',
      bankAccountName: 'IBNU ROHAN TUHAREA',
      bankAccountNumber: '7154990199',
    },
    {
      bankName: 'Bank Central Asia (BCA)',
      bankAccountName: 'Ardiana Navila Yulfa',
      bankAccountNumber: '8465817646',
    },
  ];

  isAccountNumberCopied: boolean = false;
  isModalOpen: boolean = false;
  currentPopoverIndex: number | null = null; // Tracks which popover is currently open
  popoverTimeout: any = null; // Single timeout to handle all popovers

  ngOnInit(): void {
    this.currentPopoverIndex = null;
  }

  public onCopyToClipboardClick(accountNumber: string, index: number): void {

    this.isAccountNumberCopied = false;

    navigator.clipboard.writeText(accountNumber).then(() => {
      // Close any currently open popover
      this.closeCurrentPopover();

      // Set the new current popover index and update the view
      this.currentPopoverIndex = index;
      this.changeDetector.detectChanges();

      // Set a new timeout to close the popover after 2 seconds
      this.popoverTimeout = setTimeout(() => {
        this.closeCurrentPopover();
        this.changeDetector.detectChanges(); // Update the view again to close the popover

      }, 2000); // 2000 milliseconds = 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });

  }

  public closeCurrentPopover(): void {

    // Clear the existing timeout if it exists
    if (this.popoverTimeout) {
      clearTimeout(this.popoverTimeout);
      this.popoverTimeout = null;
    }

    // Close the currently open popover and update the view
    this.currentPopoverIndex = null;

    // Trigger change detection to close the popover
    this.changeDetector.detectChanges();

  }

  public onClosePopover(): void {

    if (this.popoverTimeout) {
      clearTimeout(this.popoverTimeout);
    }

    this.currentPopoverIndex = null;

    this.changeDetector.detectChanges(); // Update the view

  }

  public openModal(): void {
    this.isModalOpen = true;
  }

  public onCloseModal(): void {
    this.isModalOpen = false;
  }

}
