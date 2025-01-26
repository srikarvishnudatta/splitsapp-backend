import { Request, Response } from "express"
import { loginUser } from "../service/auth.service"
export const loginHandler = async (req: Request, res: Response) =>{
    const data = await loginUser(1);
    res.status(200).send({body: data});
} 