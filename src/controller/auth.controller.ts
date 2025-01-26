import { Request, Response } from "express"
import { createUser, loginUser } from "../service/auth.service"
import { InsertUserType, SelectUserType } from "../db/schemas/users";
export const loginHandler = async (req: Request<{}, {}, SelectUserType>, res: Response) =>{
    const data = await loginUser(req.body);
    res.status(200).send({body: data});
} 
export const createUserHandler = async (req: Request<{}, {}, InsertUserType>, res: Response) =>{
    await createUser(req.body);
    res.status(201).send({msg: "created ok"});
}