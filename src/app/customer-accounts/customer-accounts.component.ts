import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomersComponent} from "../customers/customers.component";
import {Customer} from "../model/customer";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css',
  providers: [DatePipe] // Include DatePipe in providers

})
export class CustomerAccountsComponent implements OnInit{
  customerId!:string;
  customer!:Customer;
  accounts:any;
  constructor(private route:ActivatedRoute,private router:Router,private http:HttpClient) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer; //recuppermer l'objet à travers le systeme de routage
  }
  ngOnInit(): void {
    this.customerId=this.route.snapshot.params['id'];
    this.http.get("http://localhost:8085/customer/accounts?id="+this.customerId).subscribe({
      next:value => {
        this.accounts=value
      },
      error:err => {
        console.log(err);
      }
    })



  }

}
