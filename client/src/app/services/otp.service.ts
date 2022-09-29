import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const server = `http://localhost:8080/api`;

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor( private http: HttpClient ) { }

  uploadContacts(contactsArray: Object) {
    return this.http.post(`${server}/contacts/insertcontacts`, contactsArray);
  }

  getContacts() {
    return this.http.get(`${server}/contacts/getcontacts`);
  }

  getContact(contactId: any) {
    return this.http.get(`${server}/contacts/getcontact/${contactId}`);
  }

  sendOtpMessage(data: object){
    return this.http.post(`${server}/contacts/sendmessage`, data)
  }

}
