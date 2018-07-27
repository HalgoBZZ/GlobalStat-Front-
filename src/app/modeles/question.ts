import { Reponse } from "./reponse";
import { Customer } from "./customer";

export class Question{
    id:string;
    valueQuest:string;
    responses:Reponse[];
    customers:Customer[];
}