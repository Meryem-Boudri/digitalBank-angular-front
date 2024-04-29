import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    NavbarComponent,
    AccountsComponent,
    NewCustomerComponent,
    CustomerAccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //requette
    ReactiveFormsModule, //formulaire
    FormsModule //difference fait la liaision direct des variables

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
