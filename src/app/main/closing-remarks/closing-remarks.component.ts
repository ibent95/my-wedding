import { Component, inject, Input } from '@angular/core';
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
  styles: ``, // ['section { min-height: 96vh; }']
})
export class ClosingRemarksComponent {
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
  isPopoverOpen: boolean = false;

  /**
   * onCopyToClipboardClick
   */
  public onCopyToClipboardClick(accountNumber: string): void {

    this.isAccountNumberCopied = false;
    this.isPopoverOpen = true;

    navigator.clipboard.writeText(accountNumber).then(() => {
      this.isAccountNumberCopied = true;
      setTimeout(() => (this.isAccountNumberCopied = false), 2000); // Hide the success message after 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });

  }

  public onClosePopover(): void {
    this.isPopoverOpen = false;
  }

  public openModal(): void {
    this.isModalOpen = true;
  }

  public onCloseModal(): void {
    this.isModalOpen = false;
  }

}
