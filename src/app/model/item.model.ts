import { User } from "./user.model";

export class Item {
    constructor(
        public name: string,
        public quantity: string,
        public category: string,
        public comments: string,
        public user: User,
        public id: string
    ) {}
}