import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer";
import {AccountDetails, AccountOperation} from "../model/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  public getAccount(id: string, page : number=0, size : number=5): Observable<AccountDetails>{
    return this.http.get<AccountDetails>("http://localhost:8085/accounts/"+id+"/pageOperations?page="+page+"&size="+size);

  }
  public debit(a:string,b:number,c:string){
    let data={accountId : a, amount : b, description : c};
    // @ts-ignore
    return this.http.post(`http://localhost:8085/accounts/debit?accountId=${a}&amount=${b}&description=${c}`);

  }
  public credit(a:string,b:number,c:string){
    // @ts-ignore
    return this.http.post(`http://localhost:8085/accounts/credit?accountId=${a}&amount=${b}&description=${c}`);

  }
  public transfer(a:string,b:string,c:number){
    // @ts-ignore
    return this.http.post(`http://localhost:8085/accounts/transfer?accountId=${a}&amount=${c}&accountDestination=${b}`);

  }




}
