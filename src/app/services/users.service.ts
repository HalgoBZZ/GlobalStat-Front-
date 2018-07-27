import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../modeles/customer';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private host:string="http://localhost:8080/customers";
  constructor(private http:HttpClient) { }
  
  public getAll() {
   let url=this.host+"/all";
    return this.http.get<Customer[]>(url);
  }

  public delete(customer) {
    let url=this.host+"/delete";
    return this.http.delete(url + "/"+customer.id);
  }

  public create(customer) {
    let url=this.host+"/add";
    return this.http.post<Customer>(url, customer);
  }

  public update(customer) {
    let url=this.host+"/update";
    return this.http.post<Customer>(url, customer);
  }

  public getOne(email) {
    let url=this.host+"/byemail/"+email;
     return this.http.get<Customer>(url);
   }
}
