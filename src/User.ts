export class User {
    username:string;
    email:string;
    role:string;
    valid:boolean;
    
    constructor(username:string = "", email:string = "", role:string = "", valid=false) {
        this.username = username
        this.email = email
        this.role = role
        this.valid = valid
    }

}