import {LoginData, SignupData} from "../lib/types/types";
import db from "../db";
import {usersTable} from "../db/schemas/users";
import {eq} from "drizzle-orm";
import appAssert from "../lib/util/appAssert";
import {compareValues, hashValue} from "../lib/util/brcypt";
import {BAD_REQUEST, NOT_FOUND} from "../lib/util/httpStatusCode";
import {issueToken} from "../lib/util/jwt";

async function loginService(loginData:LoginData){
    const result = (await db
        .select({id:usersTable.id,email:usersTable.email,password:usersTable.password})
        .from(usersTable).where(eq( usersTable.email, loginData.email)))[0];
    appAssert(result, NOT_FOUND, "Account doesn't exist");
    const passwordCompare = compareValues(loginData.password, result.password);
    appAssert(passwordCompare, BAD_REQUEST, "Wrong Password");
    return issueToken({userId: result.id});
}
async function signUpService(signupData:SignupData){
    const q = (
        await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, signupData.email))
    )[0];
    appAssert(!q, BAD_REQUEST, "Account already exists!");
    await db.insert(usersTable).values({...signupData, password: hashValue(signupData.password)});
}
export {signUpService,loginService}