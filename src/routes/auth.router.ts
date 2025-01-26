import { Router } from "express";
import { createUserHandler, loginHandler } from "../controller/auth.controller";
import { errorWrapper } from "../lib/errorWrapper";
const authRouter = Router();

authRouter.get("/login", errorWrapper(loginHandler));
authRouter.post("/create", errorWrapper(createUserHandler))

export default authRouter;