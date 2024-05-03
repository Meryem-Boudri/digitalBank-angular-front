import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {authentificationGuard} from "./guards/authentification.guard";
import {autorizationGuard} from "./guards/autorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"admin",component: AdminTemplateComponent, canActivate:[authentificationGuard],
    children:[
    { path:"customers",component:CustomersComponent},
      {path:"accounts",component:AccountsComponent},
      {path:"newCustomer",component:NewCustomerComponent,canActivate: [autorizationGuard],data:{role:"ADMIN"}},
      {path:"customer-accounts/:id",component:CustomerAccountsComponent},
      {path:"notAuthorized",component:NotAuthorizedComponent}

    ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
