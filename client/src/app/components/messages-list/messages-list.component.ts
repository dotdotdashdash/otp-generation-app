import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { OtpService } from 'src/app/services/otp.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  messages: any = [ ];
  dataSource: any;
  displayedColumns: string[] = ['name', 'time', 'phone', 'otp'];

  constructor( private _otpServices: OtpService ) { }

  ngOnInit(): void {
    this._otpServices.getMessages()
      .subscribe({
        next: (responseData: any)=> {
          console.log(responseData);
          this.messages = responseData.data;
          this.dataSource = new MatTableDataSource(this.messages);

        },
        error: (errorData: any)=> {
          console.log(errorData);
        }
      });
  }

  search(text: any) {
    console.log(text.value);
    this.dataSource.filter = text.value.trim().toLowerCase();
  }

}
