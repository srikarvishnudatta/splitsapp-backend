import { Router } from "express";
import { createUserHandler, loginHandler, logoutUser, newPasswordHandler, resendVerifyHandler, resetHandler, verifyUserHandler } from "../controller/auth.controller";
import { errorWrapper } from "../lib/errorWrapper";
const authRouter = Router();

authRouter.post("/login", errorWrapper(loginHandler));
authRouter.post("/create", errorWrapper(createUserHandler));
authRouter.get("/password/reset", errorWrapper(resetHandler));
authRouter.post("/password/new/submit", errorWrapper(newPasswordHandler));
authRouter.get("/resendVerify", errorWrapper(resendVerifyHandler));
authRouter.get("/verify", errorWrapper(verifyUserHandler));
authRouter.get("/logout", errorWrapper(logoutUser));
export default authRouter;