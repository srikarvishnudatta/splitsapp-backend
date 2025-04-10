import AppError from "./AppError";
import AppErrorCode from "./AppErrorCode";
import { HttpStatusCode } from "./httpStatusCode";
import assert from "node:assert";

type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message:string,
    appErrorCode?:AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (
    condition,
    httpStatusCode,
    message, 
    appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;