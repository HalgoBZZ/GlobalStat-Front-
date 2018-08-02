import { Question } from "./question";

export class Customer{
    idCustomer:string;
    nom:string;
    prenom:string;
    tel:number;
    email:string;
    questions:Question[];
}