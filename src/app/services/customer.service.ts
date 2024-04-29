import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer";



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
//rest api avec json server "fake rest api" pour tester . puis remplacer backend avec spring
  constructor(private http: HttpClient) {
  }

  public getAllCustomer(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`http://localhost:8085/customers`);

  }

  public getCustomer(id: number): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`http://localhost:8085/customers/${id}`); //produits et header de la reponse

  }
  public searchCustomers(keyword : string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>("http://localhost:8085/customers/search?keyword="+keyword)
  }

  public deleteCustomer(id: number) {
    return this.http.delete<any>(`http://localhost:8085/customers/${id}`);

  }


  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`http://localhost:8085/customers`, customer);


  }
}
