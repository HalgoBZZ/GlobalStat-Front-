import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../modeles/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private host:string="http://localhost:8080/questions";

  constructor(private http:HttpClient) { }

  public getAll() {
    let url=this.host+"/all";
     return this.http.get<Question[]>(url);
   }

   public getAllAccueil() {
    let url=this.host+"/accueil/all";
     return this.http.get<Question[]>(url);
   }

   public getAllDebit() {
    let url=this.host+"/debit/all";
     return this.http.get<Question[]>(url);
   }

   public getAllNouveautes() {
    let url=this.host+"/nouveautes/all";
     return this.http.get<Question[]>(url);
   }
 
   public delete(question) {
     let url=this.host+"/delete";
     return this.http.delete(url + "/"+ question.id);
   }
 
   public createAcceuil(question) {
     let url=this.host+"/accueil/add";
     return this.http.post<Account>(url, question);
   }

   public createDebit(question) {
    let url=this.host+"/debit/add";
    return this.http.post<Account>(url, question);
  }

  public createNouveautes(question) {
    let url=this.host+"/nouveautes/add";
    return this.http.post<Account>(url, question);
  }
 
   public update(question) {
     let url=this.host+"/update";
     return this.http.put<Account>(url, question);
   }
}
