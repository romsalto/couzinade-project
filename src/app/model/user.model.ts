import { Item } from "./item.model";

export class User {
    constructor(
        public nom: string, 
        public prenom:string, 
        public id: string,
        public email: string
    ) {}
}