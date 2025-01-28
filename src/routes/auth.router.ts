import { Router } from "express";
import { createUserHandler, loginHandler, verifyUserHandler } from "../controller/auth.controller";
import { errorWrapper } from "../lib/errorWrapper";
const authRouter = Router();

authRouter.post("/login", errorWrapper(loginHandler));
authRouter.post("/create", errorWrapper(createUserHandler));
authRouter.get("/verify", errorWrapper(verifyUserHandler));

export default authRouter;