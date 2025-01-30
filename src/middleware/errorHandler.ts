import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import AppError from "../lib/AppError";
import { INTERNAL_SERVER_ERROR } from "../lib/httpStatusCode";

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) =>{
    console.log(`Error on path ${req.path}`);
    console.log(err);
    if(err instanceof AppError){
        appErrorHandler(res, err);
    }else{
        res.status(INTERNAL_SERVER_ERROR).send({message: "Internal server error"});
    }
}
const appErrorHandler = (res: Response, err: AppError) =>{
    return res.status(err.statusCode).json({
        message: err.message,
        errCode: err.appErrorCode
    });
}