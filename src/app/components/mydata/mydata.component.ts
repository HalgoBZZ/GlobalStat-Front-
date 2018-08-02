import { Component, OnInit } from '@angular/core';
import { Customer } from '../../modeles/customer';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-mydata',
  templateUrl: './mydata.component.html',
  styleUrls: ['./mydata.component.css']
})
export class MydataComponent implements OnInit {

  users:Customer[];

  constructor(private userService:UsersService) { }

  ngOnInit() {
    this.users=new Array<Customer>();
    this.getAllUsers();
  }


  getAllUsers():void{
    this.userService.getAll().toPromise()
    .then( users=> {
      this.users = users;
    });
  }

}
