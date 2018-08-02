import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Question } from '../../modeles/question';
import { Customer } from '../../modeles/customer';
import { Reponse } from '../../modeles/reponse';
import { ResponsesService } from '../../services/responses.service';
import { UsersService } from '../../services/users.service';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-nouveaute',
  templateUrl: './nouveaute.component.html',
  styleUrls: ['./nouveaute.component.css']
})
export class NouveauteComponent {

  private nbUsers:number;
  private nbQuest:number;
  private nbExcellent:number;
  private nbTbon:number;
  private nbMoyen:number;
  private nbMauvais:number;
  private nbTmauvais:number;
  private newQuest:Question;
  isConnected:boolean;
  noQuestions:boolean;
  notConnected:boolean;
  aquestions:Question[];
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
    private reponseService:ResponsesService) { }

  ngOnInit() {
    //Les initialisations des attributs
    this.newQuest=new Question();
    this.customer=new Customer();
    this.excellent=new Reponse();
    this.tbien=new Reponse();
    this.moyen=new Reponse();
    this.mauvais=new Reponse();
    this.tmauvais=new Reponse();
    this.reponses=new Array<Reponse>();
    this.aquestions=new Array<Question>();
    //Test d'authentification
    if(localStorage.getItem("isConnected")==="true"){
      this.isConnected=true;
      this.notConnected=false;
    }else{
      this.isConnected=false;
      this.notConnected=true;
    }
    //getting all existing responses
    this.getExcellent();
    console.log(this.excellent);
    this.getMauvais();
    this.getMoyen();
    this.getTb();
    this.getTMauvais();
    this.getQuestions();
    //this.getPourcents();
    this.nbUsers=0;
    this.nbExcellent=0;
    this.nbMauvais=0;
    this.nbMoyen=0;
    this.nbTbon=0;
    this.nbTmauvais=0;
    this.questionService.getAllNouveautes().toPromise()
    .then( questions=> {
      this.nbQuest=questions.length;
      questions.forEach(element => {
        this.nbUsers=element.responses.length;
      element.responses.forEach(e => {
        if(e.valueResponse=="Excellent"){
          this.nbExcellent=this.nbExcellent+1;
        }else if(e.valueResponse=="Trés bon"){
          this.nbTbon=this.nbTbon+1;
        }else if(e.valueResponse=="Moyen"){
          this.nbMoyen=this.nbMoyen+1;
        }else if(e.valueResponse=="Mauvais"){
          this.nbMauvais=this.nbMauvais+1;
        }else if(e.valueResponse=="Trés mauvais"){
          this.nbTmauvais=this.nbTmauvais+1;
        }
      });
    });
    let exc=(this.nbExcellent*100)/(this.nbUsers*this.nbQuest);
    localStorage.setItem("nbExcellentn",exc.toString());
    let tb=(this.nbTbon*100)/(this.nbUsers*this.nbQuest);
    localStorage.setItem("nbTbonn",tb.toString());
    let moy=(this.nbMoyen*100)/(this.nbUsers*this.nbQuest);
    localStorage.setItem("nbMoyenn",moy.toString());
    let mov=(this.nbMauvais*100)/(this.nbUsers*this.nbQuest);
    localStorage.setItem("nbMauvaisn",mov.toString());
    let tm=(this.nbTmauvais*100)/(this.nbUsers*this.nbQuest);
    localStorage.setItem("nbTmauvaisn",tm.toString());
  }); 

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
        text: 'Nombre de clients(%)'
    }
   },
    title: {
      text: 'Satisfaction des clients en terme de débit'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name:'Nombre de clients (%)',
        //data:[20,20,10,5]
        data: [
          parseInt(localStorage.getItem("nbTmauvaisn")),
          parseInt(localStorage.getItem("nbMauvaisn")),
          parseInt(localStorage.getItem("nbMoyenn")),
          parseInt(localStorage.getItem("nbTbonn")),
          parseInt(localStorage.getItem("nbExcellentn"))
        ]
      }
    ]
  });
 
  save(): void {
    this.questionService.createNouveautes(this.newQuest)
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

 

  getCustomer(){
    this.userService.getOne(this.customer.email)
    .subscribe(data => {
      this.cust=data;
    })
  }

  addCustomer(){
    this.userService.create(this.customer)
    .subscribe(data => {
      console.log("user added");
    });
  }

  updateQuestions(){
    let i=0;
    this.aquestions.forEach(element => {
      element.responses.push(this.reponses[i]);
      i=i+1;
      element.customers.push(this.cust);
      this.questionService.update(element)
      .subscribe(data => {
      });
    });

  }

  addUser(){
    this.addCustomer();
    this.getCustomer();
    this.updateQuestions();
    location.reload();
  }

  getQuestions():void{
    this.questionService.getAllNouveautes().toPromise()
    .then( questions=> {
      this.aquestions = questions;
    });
   
  }
}
