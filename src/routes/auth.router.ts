import { Router } from "express";
import { loginHandler } from "../controller/auth.controller";
import { errorWrapper } from "../lib/errorWrapper";
const authRouter = Router();

authRouter.get("/login", errorWrapper(loginHandler))

export default authRouter;