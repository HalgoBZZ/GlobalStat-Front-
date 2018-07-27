import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isConnected:boolean;
  notConnected:boolean;
  conn:string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.conn=localStorage.getItem("isConnected");
    if(this.conn=="true"){
      this.isConnected=true;
      this.notConnected=false;
    }else{
      this.isConnected=false;
      this.notConnected=true;
    }
  }

  deconnexion(){
    localStorage.removeItem("isConnected");
    this.router.navigate(['/admin']);
    location.reload();
  }

}
