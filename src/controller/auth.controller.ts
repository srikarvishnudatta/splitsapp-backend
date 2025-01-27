import { Request, Response } from "express"
import { createUser, loginUser } from "../service/auth.service"
import { InsertUserType, SelectUserType } from "../db/schemas/users";
import { loginSchema } from "../lib/zod.schemas";
export const loginHandler = async (req: Request<{}, {}, SelectUserType>, res: Response) =>{
    const body = req.body;
    const userAgent = req.headers["user-agent"];
    loginSchema.parse({...body, userAgent});
    const accessToken = await loginUser(body, userAgent);
    res.status(200).send({accessToken});
} 
export const createUserHandler = async (req: Request<{}, {}, InsertUserType>, res: Response) =>{
    await createUser(req.body);
    res.status(201).send({msg: "created ok"});
}
