import { RequestHandler } from "express";
import appAssert from "../lib/util/appAssert";
import { UNAUTHORIZED } from "../lib/util/httpStatusCode";
import AppErrorCode from "../lib/util/AppErrorCode";
import {verifyToken} from "../lib/util/jwt";

const authenticate: RequestHandler = (req, res, next) =>{
    const auth = req.headers['authorization'] as string | undefined;
    const accessToken = auth?.split(" ")[1]
    appAssert(accessToken, UNAUTHORIZED, "Invalid Access Token", AppErrorCode.InvalidAccessToken);

    const {error, payload} = verifyToken(accessToken);

    appAssert(payload, UNAUTHORIZED, error === "jwt expired" ? "Token expired" : "Invalid token",
        AppErrorCode.InvalidAccessToken);

    //@ts-ignore
    req.userId = payload.userId;
    next();
}
export default authenticate;