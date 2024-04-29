import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../services/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer";
import {AccountDetails, AccountOperation} from "../model/account";
import * as http from "http";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFormGroup! : FormGroup;
  account!: AccountDetails;
  operationFormGroup!: FormGroup;

  page!:number;
  size!:number;
  constructor(private ac:AccountService,private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      id: this.fb.control("")
    });
    this.operationFormGroup=this.fb.group({
      operationType: this.fb.control(null),
      accountDestination:this.fb.control(null),
      amount:this.fb.control(0,Validators.required),
      description:this.fb.control(null)
    });


  }


  handleSearchAccount() {
    this.ac.getAccount(this.accountFormGroup.value.id,this.page,this.size).subscribe({
      next: value=> {
        this.account = value
      }
      , error:err=> {
        console.log(err)
      }

    })
  }
  gotoPage(page: number) {
    this.page=page;
    this.handleSearchAccount();
  }



  handleOperation() {

      let operationType = this.operationFormGroup.value.operationType;
      let amount = this.operationFormGroup.value.amount;
      let id = this.accountFormGroup.value.id;
      let des = this.operationFormGroup.value.description;
      let destination = this.operationFormGroup.value.accountDestination;
      if (operationType == 'DEBIT') {
        this.ac.debit(id, amount, des).subscribe({
          next: value => alert("Success debit"),
          error: err => console.log(err.value)
        })

      }
      if (operationType == 'CREDIT') {
        this.ac.credit(id, amount, des).subscribe({
          next: value => alert("Success credit"),
          error: err => console.log(err.value)
        })
      }
      if (operationType == 'TRANSFER') {
        this.ac.transfer(id, destination, amount).subscribe({
          next: value => alert("Success transfer"),
          error: err => console.log(err.value)
        })

      }
    this.handleSearchAccount();
    }






}
