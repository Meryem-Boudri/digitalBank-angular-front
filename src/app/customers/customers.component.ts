import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";
import {Customer} from "../model/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  customers! :Array<Customer>;
  searchFormGroup!: FormGroup;
  private errorMessage: string | undefined;



  constructor(private fb: FormBuilder,private http: HttpClient, private cs: CustomerService, private route: Router) {
  }

  ngOnInit(): void {
    this.getAllCustomers();

    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });


  }

  getAllCustomers() {
    this.cs.getAllCustomer().subscribe({
      next: (data) => {
        this.customers = data;

      }, error: (err) => {
        console.log(err);
      }

    });

  }


  handelCustomerAccounts(c: Customer) {

    this.route.navigateByUrl("/customer-accounts/"+c.id,{state:c}); //transmettre l'objet


  }

  handelDeleteCustomer(c: Customer) {
    if (confirm("etes vous sure?")) //alerte
      this.cs.deleteCustomer(c.id).subscribe({
        next: value => {
          this.getAllCustomers(); // refresh

        }
      })

  }

   handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
     this.cs.searchCustomers(kw).subscribe({
       next:value => {
         this.customers=value;
       },
       error: err => {
         console.log(err);

       }
     });
     /*
         this.customers=this.cs.searchCustomers(kw).pipe(
           catchError(err => {
             this.errorMessage=err.message;
             return throwError(err);
        })
         );
         */


  }
}
