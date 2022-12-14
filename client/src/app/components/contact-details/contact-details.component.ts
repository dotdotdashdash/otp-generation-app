import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OtpService } from 'src/app/services/otp.service';

// main component to display the contact details
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  
  contact: any = { };
  contactId: any;

  messages: any = [ ];
  dataSource: any;
  displayedColumns: string[] = ['time', 'messageBody'];

  constructor( 
    private _otpServices: OtpService,
    private _bottomSheet: MatBottomSheet,
    private _title: Title
  ) { }

  ngOnInit(): void {
    this.contactId = sessionStorage.getItem('contactId');
    this._otpServices.getContact(this.contactId)
      .subscribe({
        next: (responseData: any)=> {
          if(responseData.success) {
            this.contact = responseData.data;
            console.log(this.contact.communicationInfo.otpMessages);
            this.messages = this.contact.communicationInfo.otpMessages;
            this.dataSource = new MatTableDataSource(this.messages);
            this._title.setTitle(`${this.contact.firstName} ${this.contact.lastName}: Contact Details: OTP generation app: Kisan Network`)
          } else {
            alert('Failed getting contact details');
          }
        },
        error: (errorData: any)=> {
            alert('Failed getting contact details');
            console.log(errorData);
        }
      });
  }

  openBottomSheet(): void {
    let min = Math.ceil(100000);
    let max = Math.floor(999999);
    var otp = Math.floor(Math.random() * (max - min) + min);
    const sheetRef = this._bottomSheet.open(ComposeMessageSheet, { // injecting the data to be displayed in the bottom sheet
      data: {
        contactId: this.contactId,
        name: `${this.contact.firstName} ${this.contact.lastName}`,
        phone: this.contact.phone,
        otp: otp,
        messageContent: `Hi! Your OTP is ${otp}`
      }
    });
  }

}

//New component to be displayed as the bottomsheet with message content
@Component({
  selector: 'compose-message-sheet',
  templateUrl: 'compose-message-sheet.html',
})
export class ComposeMessageSheet {

  textAreaStatus: boolean = true; 
  waiting: boolean = false;
  // messageContent = `Hi! Your OTP is ${this.data.otp}`;

  constructor( 
    private _bottomSheetRef: MatBottomSheetRef<ComposeMessageSheet>,
    private _otpServices: OtpService,
    private _router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) 
    public data: { 
      name: string,
      phone: string,
      otp: number,
      messageContent: string
    },
    public dialog: MatDialog
  ) {}

  
  toggleTextAreaStatus() {
    this.textAreaStatus = !this.textAreaStatus // to enable/disable editing the message content
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  sendOtpMessage(data: Object) {
    this.waiting = true; //show indeterminate progress bar
    this._otpServices.sendOtpMessage(data)
      .subscribe({
        next: (responseData: any)=> {
          if(responseData.success) {
            this.openDialog(`OTP Successfully Sent`, `Done`)
            this._bottomSheetRef.dismiss();
          } else {
            this.openDialog(`OTP Sending Failed`, `Failed`);
            this._bottomSheetRef.dismiss();
          }
        },
        error: (errorData: any)=> {
          console.log(errorData);
          this.openDialog(`OTP Sending Failed`, `Failed`);
          this._bottomSheetRef.dismiss();
        }
      });
  }

  openDialog(message: any, status: any) {
    this.waiting = false; //hide indeterminated progress bar
    const dialogRef = this.dialog.open(DialogElement, {
      data: {
        message: message,
        status: status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const currentRoute = this._router.url; // function to reload the current component
      this._router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this._router.navigate([currentRoute]); // navigate to same route
        }); 
    });
  }

}

//component to be displayed as the dialogue box; button color is warn if status is not 'Done'
@Component({
  selector: 'dialog-element',
  template: 
    `
    <div style= "min-width: 250px;">
      <h1 mat-dialog-title>{{data.status}}</h1>
      <div mat-dialog-content>{{data.message}}</div>
      <div mat-dialog-actions>
        <button [color]="(data.status != 'Done')? 'warn' : 'primary'" mat-button mat-dialog-close>Close</button>
      </div>
    </div>

    `
})
export class DialogElement {
  constructor( @Inject(MAT_DIALOG_DATA) public data: { message: string, status: string } ) { }
}


