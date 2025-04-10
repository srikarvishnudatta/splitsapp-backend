import {Router} from "express";
import {loginHandler, signUpHandler} from "../controller/auth.controller";
import {errorWrapper} from "../lib/util/errorWrapper";
const authRouter =  Router();

authRouter.post("/login", errorWrapper(loginHandler));
authRouter.post("/signup", errorWrapper(signUpHandler));

export default authRouter;