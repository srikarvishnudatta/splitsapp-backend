import { Request, Response } from "express"
import { createUser, loginUser, newPasswordUpdate, requestResetLink, verifyUser } from "../service/auth.service"
import { InsertUserType, SelectUserType } from "../db/schemas/users";
import { loginSchema } from "../lib/zod.schemas";
export const loginHandler = async (req: Request<{}, {}, SelectUserType>, res: Response) =>{
    const body = req.body;
    const userAgent = req.headers["user-agent"];
    loginSchema.parse({...body, userAgent});
    const accessToken = await loginUser(body, userAgent);
    return res.status(200).send({accessToken});
} 
export const createUserHandler = async (req: Request<{}, {}, InsertUserType>, res: Response) =>{
    await createUser(req.body);
    return res.status(201).send({msg: "verification link sent!"});
}
export const verifyUserHandler = async (req: Request, res: Response) =>{
    const email = req.query.email as string;
    const expiresAt = req.query.expiresAt as string;
    await verifyUser(email, expiresAt);
    return res.status(200).send({msg: "ok verified"});
}
export const resetHandler = async (req: Request, res: Response) =>{
    const email = req.query.email as string;
    requestResetLink(email) 
    return res.status(200).send({msg : "email reset link will be sent shortly!"});
}   
export const newPasswordHandler = async (req: Request<{}, {}, {newPassword:string}>, res: Response) =>{
    const email = req.query.email as string;
    const expiresAt = req.query.expiresAt as string;
    newPasswordUpdate(email, expiresAt, req.body.newPassword);
    return res.status(200).send({msg: "password updated successfully!"});
}
