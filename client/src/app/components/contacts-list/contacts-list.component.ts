import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { OtpService } from 'src/app/services/otp.service';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit{

  contacts: any = [ ];
  dataSource: any;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  displayedColumns: string[] = ['name', 'phone', 'email'];

  constructor(
    private _router: Router,
    private _otpServices: OtpService,
    public dialog: MatDialog,
    private _title: Title
  ) {
    this._title.setTitle('Contacts: OTP generation app')
  }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddContactDialog, {
      width: '350px',
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

@Component({
  selector: 'add-contact-dialog',
  templateUrl: 'add-contact-dialog.html',
})
export class AddContactDialog {
  contact: any = { }

  constructor(
    public dialogRef: MatDialogRef<AddContactDialog>,
    private _otpServices: OtpService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addNewContact() {
    this._otpServices.uploadContact(this.contact)
      .subscribe({
        next: (responseData: any)=> {
          alert(`New contact added succesfuly`);
          this.dialogRef.close();

        },
        error: (errorData: any)=> {
          console.log(errorData);
          
        }
      });
  }
}
