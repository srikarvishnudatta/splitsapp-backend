import { Router } from "express";
import { createUserHandler, loginHandler } from "./auth.controller";
import { errorWrapper } from "../lib/util/errorWrapper";
const authRouter = Router();

authRouter.post("/login", errorWrapper(loginHandler));
authRouter.post("/signup", errorWrapper(createUserHandler));

// authRouter.get("/password/reset", errorWrapper(resetHandler));
// authRouter.post("/password/new/submit", errorWrapper(newPasswordHandler));
// authRouter.get("/resendVerify", errorWrapper(resendVerifyHandler));
// authRouter.get("/verify", errorWrapper(verifyUserHandler));
// authRouter.get("/logout", errorWrapper(logoutUser));
export default authRouter;