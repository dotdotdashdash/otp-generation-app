import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddContactDialog, ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ComposeMessageSheet, ContactDetailsComponent, DialogElement } from './components/contact-details/contact-details.component';
import { FormsModule } from '@angular/forms';
import { MessagesListComponent } from './components/messages-list/messages-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContactsListComponent,
    HeaderComponent,
    ContactDetailsComponent,
    ComposeMessageSheet,
    DialogElement,
    MessagesListComponent,
    AddContactDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
