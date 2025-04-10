import { SignOptions, VerifyOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export type AccessTokenPayload = {
    userId: number;
}
type SignOptionsAndSecret = SignOptions & {
    secret:string;
}
const defaults: SignOptions = {
    audience: ["user"]
}
const accessTokenOptions: SignOptionsAndSecret = {
    expiresIn: "1d",
    secret: process.env.ACCESS_TOKEN_SECRET!
}

export const issueToken = (
    payload: AccessTokenPayload,
    options?: SignOptionsAndSecret
) =>{
    const {secret, ...signInOptions} = options || accessTokenOptions;
    return jwt.sign(payload, secret, {
        ...defaults,
        ...signInOptions
    });
}
export const verifyToken = <TPayload extends object = AccessTokenPayload>(
    token: string, 
    options?: VerifyOptions & {
        secret?:string;
    }
) =>{
    const {secret = process.env.ACCESS_TOKEN_SECRET!, ...verifyOpts} = options || {}
    try {
        const payload = jwt.verify(token, secret,{
            ...verifyOpts
        }) as TPayload
        return {payload};
    } catch (error:any) {
        return {
            error: error.message
        }
    }
}