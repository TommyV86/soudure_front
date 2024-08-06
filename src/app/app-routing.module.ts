import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './component/public/main-page/main-page.component';
import { DetailsMeubleComponent } from './component/public/details-meuble/details-meuble.component';
import { SelectionComponent } from './component/public/selection/selection.component';
import { ContactComponent } from './component/public/contact/contact.component';
import { MailSuccessComponent } from './component/public/mail-pages/mail-success/mail-success.component';
import { MailFailedComponent } from './component/public/mail-pages/mail-failed/mail-failed.component';
import { FormMeubleComponent } from './component/public/form-meuble/form-meuble.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'details-meuble/:nom', component: DetailsMeubleComponent },
  { path: 'selection/:id', component: SelectionComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mail-success', component: MailSuccessComponent },
  { path: 'mail-failed', component: MailFailedComponent },
  { path: 'form-meuble', component: FormMeubleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
