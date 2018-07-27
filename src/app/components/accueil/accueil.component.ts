import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Question } from '../../modeles/question';
import { QuestionsService } from '../../services/questions.service';
import { Customer } from '../../modeles/customer';
import { UsersService } from '../../services/users.service';
import { ResponsesService } from '../../services/responses.service';
import { Reponse } from '../../modeles/reponse';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  newQuest:Question;
  isConnected:boolean;
  notConnected:boolean;
  questions:Question[];
  customer:Customer;
  excellent:Reponse;
  tbien:Reponse;
  moyen:Reponse;
  mauvais:Reponse;
  tmauvais:Reponse;
  reponses:Reponse[];
  cust:Customer;
  constructor(private questionService:QuestionsService, 
    private userService:UsersService, 
    private reponseService:ResponsesService ) { }

  ngOnInit() {
    this.newQuest=new Question();
    this.customer=new Customer();
    this.excellent=new Reponse();
    this.tbien=new Reponse();
    this.moyen=new Reponse();
    this.mauvais=new Reponse();
    this.tmauvais=new Reponse();
    this.reponses=new Array();

    if(localStorage.getItem("isConnected")==="true"){
    this.isConnected=true;
    this.notConnected=false;
    }
    else{
    this.isConnected=false;
    this.notConnected=true;
    }
    this.getExcellent();
    this.getMauvais();
    this.getMoyen();
    this.getTb();
    this.getTMauvais();
    this.getQuestions();

}
chart = new Chart({
    chart: {
      type: 'column'
    },
    xAxis: {
        categories: ["Trés mauvais","Mauvais","Moyen","Trés bon","Excellent" ]
    },
   yAxis:{
    min: 0,
    title: {
        text: 'Nombre de clients'
    }
   },
    title: {
      text: 'Satisfaction des clients en terme d accueil'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name:'Nombre de clients',
        data: [100,50,20,60,200]
      }
    ]
  });
 
  save(): void {
    this.questionService.createAcceuil(this.newQuest)
        .subscribe( data => {
          alert("Ajout avec succès");
        });
        location.reload();
  }

  getExcellent(){
    this.reponseService.getOne("Excellent")
    .subscribe(data => {
      this.excellent=data;
    })
  }

  getTb(){
    this.reponseService.getOne("Trés bon")
    .subscribe(data => {
      this.tbien=data;
    })
  }
  getMoyen(){
    this.reponseService.getOne("Moyen")
    .subscribe(data => {
      this.moyen=data;
    })
  }

  getMauvais(){
    this.reponseService.getOne("Mauvais")
    .subscribe(data => {
      this.mauvais=data;
    })
  }

  getTMauvais(){
    this.reponseService.getOne("Trés mauvais")
    .subscribe(data => {
      this.tmauvais=data;
    })
  }

  update(quest:Question){
    this.questionService.update(quest);
  }

  clickh(){
    console.log(this.reponses);
  }

  getCustomer(email){
    this.userService.getOne(email)
    .subscribe(data => {
      this.cust=data;
    })
  }
  addUser(){
    this.userService.create(this.customer)
    .subscribe();
    this.getCustomer(this.customer.email);
    console.log(this.cust);
    let i=0;
    this.questions.forEach(element => {
      element.responses.push(this.reponses[i]);
      i=i+1;
      element.customers.push(this.cust);
      this.questionService.update(element).subscribe();
    });
  }

  getQuestions(){
    this.questionService.getAllAccueil()
    .subscribe( data => {
      this.questions = data;
    });
  }

}
