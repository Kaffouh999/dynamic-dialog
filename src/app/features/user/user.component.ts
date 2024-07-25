import { Component, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductListDemo } from '../../prodList';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ButtonModule,DynamicDialogModule, ToastModule],
  providers: [DialogService, MessageService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  animations: [trigger('openClose', [
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      height: '100px',
      opacity: 0.5,
      backgroundColor: 'green'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
  ])]
})
export class UserComponent implements OnDestroy{
  ref: DynamicDialogRef | undefined;
  constructor(private dialogService: DialogService, private messageService: MessageService) {}
  show() {
    this.ref = this.dialogService.open(ProductListDemo, {
        header: 'Select a Product',
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
        templates: {
            //footer: Footer
        }
    });

    this.ref.onClose.subscribe((data: any) => {
        let summary_and_detail;
        if (data) {
            const buttonType = data?.buttonType;
            summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data?.name };
        } else {
            summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
        }
        this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
    });

    this.ref.onMaximize.subscribe((value) => {
        this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
}
ngOnDestroy() {
  if (this.ref) {
      this.ref.close();
  }
}
}
