import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  messages: any = [ ];
  dataSource: any;
  displayedColumns: string[] = ['slNo', 'Time', 'phone', 'OTP'];

  constructor() { }

  ngOnInit(): void {
    
  }

  search(text: any) {
    console.log(text.value);
    this.dataSource.filter = text.value.trim().toLowerCase();
  }

}
