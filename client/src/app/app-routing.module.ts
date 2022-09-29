import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'contacts',
    component: ContactsListComponent
  },
  {
    path: 'viewcontact',
    component: ContactDetailsComponent
  },
  {
    path: 'messages',
    component: MessagesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
