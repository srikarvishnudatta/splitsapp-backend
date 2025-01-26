import { NextFunction, Request, Response } from "express"

type AsyncController = (
    req: Request,
    res: Response, 
    next: NextFunction
) => Promise<any>;

export const errorWrapper = (controller : AsyncController): AsyncController => async (req, res, next) =>{
    try {
        await controller(req, res, next);
    } catch (error) {
        next(error);
    }
}
// function errorHandler(controller: AsyncController): AsyncController{
//     return async function randomController(req, res, next){
//         try{
//             await controller(req, res, next);
//         }catch(error){
//             next(error);
//         }
//     }
// }