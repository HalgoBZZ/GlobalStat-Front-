import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrationService } from '../../services/administration.service';
import { Account } from '../../modeles/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account:any;
  admin: Account;
  users: any;
  login:string;
  pwd:string;
  mode:number;

  constructor(private router: Router,private administrationService:AdministrationService) { }

  ngOnInit() {
    this.admin=new Account();
    this.account=new Account();
  }

 
  getUsers(){
  this.administrationService.getAll()
  .subscribe( data => {
    this.users = data;
  });
  }

  connexion(){
    this.administrationService.connexion(this.account.login,this.account.pwd)
    .subscribe(data =>{
      this.account=data;
      if(data!=null){
        localStorage.setItem("isConnected","true");
        this.router.navigate(['/accueil']);
        location.reload();
      }else{
        this.mode=1;
      }
    });
  }

  createUser(): void {
    this.administrationService.create(this.admin)
        .subscribe( data => {
          alert("Ajout avec succès");
        });

  }

  deleteUser(user: Account): void {
    this.administrationService.delete(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  }

}
