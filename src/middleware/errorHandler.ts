import { Request, Response, NextFunction, ErrorRequestHandler } from "express"

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) =>{
    console.log(`Error on path ${req.path}`);
    console.log(err);
    
    res.status(500).send({message: "Internal server error"});
}