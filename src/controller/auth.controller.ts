import {Request, Response} from "express";
import {LoginData, SignupData} from "../lib/types/types";
import {loginService, signUpService} from "../service/auth.service";
import {loginSchema} from "../lib/zodSchemas/zod.schemas";

async function loginHandler(req: Request<{}, {}, LoginData>, res: Response){
    const loginData = req.body;
    loginSchema.parse({...loginData});
    const accessToken = await loginService(loginData);
    return res.status(200).json({accessToken});
}
async function signUpHandler(req: Request<{}, {}, SignupData>, res:Response){
    const signupData = req.body;
    console.log(signupData)
    await signUpService(signupData);
    return res.status(201).json({message: "Ok created"});
}
export {loginHandler, signUpHandler}