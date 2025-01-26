import  { hashSync } from "bcrypt";

export const hashValue = (password:string, saltRounds = 10) =>{
    return hashSync(password, saltRounds);
}