import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { OtpService } from 'src/app/services/otp.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit, AfterViewInit {

  messages: any = [ ];
  dataSource: any;
  displayedColumns: string[] = ['name', 'time', 'phone', 'otp'];

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }
  
  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
