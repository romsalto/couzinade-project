import { User } from "./user.model";

export class Activity {
    constructor(
        public id: string,
        public name: string,
        public link: string,
        public users: User[]
    ) {}
}