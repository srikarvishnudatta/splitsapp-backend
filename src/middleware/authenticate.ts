import { RequestHandler } from "express";
import appAssert from "../lib/appAssert";
import { UNAUTHORIZED } from "../lib/httpStatusCode";
import AppErrorCode from "../lib/AppErrorCode";
import { verifyToken } from "../lib/jwt";

const authenticate: RequestHandler = (req, res, next) =>{
    const auth = req.headers['authorization'] as string | undefined;
    const accessToken = auth?.split(" ")[1]
    appAssert(accessToken, UNAUTHORIZED, "Invalid Access Token", AppErrorCode.InvalidAccessToken);

    const {error, payload} = verifyToken(accessToken);

    appAssert(payload, UNAUTHORIZED, error === "jwt expired" ? "Token expired" : "Invalid token",
        AppErrorCode.InvalidAccessToken);
    // @ts-ignore
    req.userId = payload.userId;
    // @ts-ignore
    req.sessionId = payload.sessionId;
    next();
}
export default authenticate;