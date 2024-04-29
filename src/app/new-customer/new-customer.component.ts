import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})



export class NewCustomerComponent implements OnInit {

  public customerForm!: FormGroup;

  constructor(private fb: FormBuilder,private http:HttpClient,private cs:CustomerService,private router:Router) { //fb structure du formulaire
  }

  ngOnInit(): void {
    {
      this.customerForm = this.fb.group({
        name: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required])
      })
    }


  }

  saveCustomer() {
    let customer:Customer=this.customerForm.value;
    this.cs.saveCustomer(customer).subscribe({
      next : data=>{
        alert("Customer has been successfully saved!");
        //this.newCustomerFormGroup.reset();
       this.router.navigateByUrl("/customers")
      },
      error : err => {
        console.log(err);
      }
    });

  }
}
