import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor( private http: HttpClient ) { }

  uploadContacts(contactsArray: Object) {
    return this.http.post(`${environment.server}/contacts/insertcontacts`, contactsArray);
  }

  uploadContact( contact: Object) {
    return this.http.post(`${environment.server}/contacts/addcontact`, contact);
  }

  getContacts() {
    return this.http.get(`${environment.server}/contacts/getcontacts`);
  }

  getContact(contactId: any) {
    return this.http.get(`${environment.server}/contacts/getcontact/${contactId}`);
  }

  sendOtpMessage(data: object){
    return this.http.post(`${environment.server}/contacts/sendmessage`, data)
  }

  getMessages() {
    return this.http.get(`${environment.server}/messages/getmessages`);
  }

}
