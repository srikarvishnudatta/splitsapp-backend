export interface NewGroupData{
    group_name:string;
    owner:number;
}
export interface NewGroupBody{
group_name:string;
}
export interface LoginData{
    email:string;
    password:string;
}
export interface SignupData{
    email:string;
    password:string;
    first_name:string;
    last_name:string;
}