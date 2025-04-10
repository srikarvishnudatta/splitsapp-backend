import  { compareSync, hashSync } from "bcrypt";

export const hashValue = (password:string, saltRounds = 10) =>{
    return hashSync(password, saltRounds);
}
export const compareValues = (password: string, hash:string) =>{
    return compareSync(password, hash);
}