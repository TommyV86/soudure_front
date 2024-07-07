import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './component/public/header/header.component';
import { FooterComponent } from './component/public/footer/footer.component';
import { MainPageComponent } from './component/public/main-page/main-page.component';
import { DetailsMeubleComponent } from './component/public/details-meuble/details-meuble.component';
import { SelectionComponent } from './component/public/selection/selection.component';
import { ContactComponent } from './component/public/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MailSuccessComponent } from './component/public/mail-pages/mail-success/mail-success.component';
import { MailFailedComponent } from './component/public/mail-pages/mail-failed/mail-failed.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    DetailsMeubleComponent,
    SelectionComponent,
    ContactComponent,
    MailSuccessComponent,
    MailFailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
