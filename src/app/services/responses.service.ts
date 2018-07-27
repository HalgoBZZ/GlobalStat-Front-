import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reponse } from '../modeles/reponse';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  private host:string="http://localhost:8080/responses";
  constructor(private http:HttpClient) { }
  
  public getAll() {
   let url=this.host+"/all";
    return this.http.get<Reponse[]>(url);
  }

  public getOne(value) {
    let url=this.host+"/byvalue/"+value;
     return this.http.get<Reponse>(url);
   }

  public delete(response) {
    let url=this.host+"/delete";
    return this.http.delete(url + "/"+response.id);
  }

  public create(reponse) {
    let url=this.host+"/add";
    return this.http.post<Reponse>(url, reponse);
  }

  public update(reponse) {
    let url=this.host+"/update";
    return this.http.post<Reponse>(url, reponse);
  }
  
}
