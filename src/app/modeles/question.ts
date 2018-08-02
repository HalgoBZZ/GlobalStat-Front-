import { Reponse } from "./reponse";
import { Customer } from "./customer";
import { Module } from "./module";

export class Question{
    id:string;
    valueQuest:string;
    responses:Reponse[];
    customers:Customer[];
    module:Module;
}