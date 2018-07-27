import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  private host:string="http://localhost:8080/accounts";
  constructor(private http:HttpClient) { }
  
  public getAll() {
   let url=this.host+"/all";
    return this.http.get<Account[]>(url);
  }

  public connexion(login,pwd) {
    let url=this.host+"/connexion";
     return this.http.get<Account>(url+"/"+login+"/"+pwd);
   }

  public delete(account) {
    let url=this.host+"/delete";
    return this.http.delete(url + "/"+ account.id);
  }

  public create(account) {
    let url=this.host+"/add";
    return this.http.post<Account>(url, account);
  }

  public update(account) {
    let url=this.host+"/update";
    return this.http.post<Account>(url, account);
  }
}
