import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Module } from '../modeles/module';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  private host:string="http://localhost:8080/modules";
  constructor(private http:HttpClient) { }
  
  public getAll() {
   let url=this.host+"/all";
    return this.http.get<Module[]>(url);
  }

  public getOne(value) {
    let url=this.host+"/byvalue/"+value;
     return this.http.get<Module>(url);
   }

  public delete(module) {
    let url=this.host+"/delete";
    return this.http.delete(url + "/"+module.id);
  }

  public create(module) {
    let url=this.host+"/add";
    return this.http.post<Module>(url, module);
  }

  public update(module) {
    let url=this.host+"/update";
    return this.http.post<Module>(url, module);
  }
}
