import AppErrorCode from "./AppErrorCode";
import { HttpStatusCode } from "./httpStatusCode";

class AppError extends Error{
    constructor(
        public statusCode: HttpStatusCode,
        public message:string,
        public appErrorCode?:AppErrorCode
    ){
        super(message);
    }
}
export default AppError;