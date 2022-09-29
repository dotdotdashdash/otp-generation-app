import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor() { }

  uploadContacts(contactsArray: Object) {
    console.log(contactsArray);
    
  }
}
