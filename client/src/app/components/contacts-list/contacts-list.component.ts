import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { OtpService } from 'src/app/services/otp.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: any = [ ];
  dataSource: any;

  displayedColumns: string[] = ['slNo', 'name', 'phone', 'email'];

  constructor(
    private _router: Router,
    private _otpServices: OtpService
  ) { }

  ngOnInit(): void {
    this._otpServices.getContacts()
      .subscribe({
        next: (responseData: any)=> {
          if(responseData.success) {
            this.contacts = responseData.data;
            this.dataSource = new MatTableDataSource(this.contacts);
          } else {
            alert('Error while fetching contacts');
            console.log(responseData.message);
          }
        },
        error: (errorData: any)=> {
          alert(`Error while fetching contacts`);
          console.log(errorData.name);
        }
      });
  }

  viewContact(contactId: any) {
    sessionStorage.setItem('contactId', contactId);
    this._router.navigate(['viewcontact']);
  }

  search(text: any) {
    console.log(text.value);
    this.dataSource.filter = text.value.trim().toLowerCase();
  }

  uploadContactsJson(e: any) {
    var file = e.target.files[0]; //get the file from local disc
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8"); // read the file
      reader.onload = (event: any)=> {
        this._otpServices.uploadContacts((JSON.parse(event.target.result))) // send the data server
          .subscribe({
            next: (responseData: any)=> {
              console.log(responseData);
              const currentRoute = this._router.url; // function to reload the current component
              this._router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this._router.navigate([currentRoute]); // navigate to same route
                }); 
            },
            error: (errorData: any)=> {
              console.log(errorData);
            }
          });
      }
      reader.onerror = (event: any)=> {
        console.log('error reading file');
      }
    } else {
      alert('No file found. Try again')
    }
  }

}
