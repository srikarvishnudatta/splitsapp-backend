import { Router } from "express";
import { createUserHandler, loginHandler, newPasswordHandler, resetHandler, verifyUserHandler } from "../controller/auth.controller";
import { errorWrapper } from "../lib/errorWrapper";
const authRouter = Router();

authRouter.post("/login", errorWrapper(loginHandler));
authRouter.post("/create", errorWrapper(createUserHandler));
authRouter.get("/password/reset", errorWrapper(resetHandler));
authRouter.post("/password/new/submit", errorWrapper(newPasswordHandler));
authRouter.get("/verify", errorWrapper(verifyUserHandler));

export default authRouter;