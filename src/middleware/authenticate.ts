import { RequestHandler } from "express";
import appAssert from "../lib/appAssert";
import { UNAUTHORIZED } from "../lib/httpStatusCode";
import AppErrorCode from "../lib/AppErrorCode";
import { verifyToken } from "../lib/jwt";

const authenticate: RequestHandler = (req, res, next) =>{
    const accessToken = req.headers['Authorization'] as string | undefined;
    appAssert(accessToken, UNAUTHORIZED, "Invalid Access Token", AppErrorCode.InvalidAccessToken);

    const {error, payload} = verifyToken(accessToken);

    appAssert(payload, UNAUTHORIZED, error === "jwt expired" ? "Token expired" : "Invalid token",
        AppErrorCode.InvalidAccessToken);
    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    next();
}
export default authenticate;