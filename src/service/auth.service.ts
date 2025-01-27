import { usersTable, InsertUserType, SelectUserType } from "../db/schemas/users";
import db from "../db";
import { compareValues, hashValue } from "../lib/brcypt";
import { eq } from "drizzle-orm";
import appAssert from "../lib/appAssert";
import { BAD_REQUEST, NOT_FOUND } from "../lib/httpStatusCode";
import { newUserSchema } from "../lib/zod.schemas";
import { setSession } from "./session.service";
import { issueToken } from "../lib/jwt";




export const loginUser = async (user: SelectUserType, userAgent?:string) => {
    const userFound = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
    appAssert(userFound, NOT_FOUND, "User not found!");
    appAssert(userFound[0].is_verified, BAD_REQUEST, "User not verified");
    appAssert(compareValues(user.password, userFound[0].password), BAD_REQUEST, "Bad credentials!");
    // create a new session, then issue a new jwt token.
    const {id: session_id} = (await setSession(userFound[0].id, userAgent))[0];
    const accesstoken = issueToken({
        userId: userFound[0].id,
        sessionId: session_id
    });
    return accesstoken;
}
export const createUser = async (newUser: InsertUserType) =>{
    // verify the user, and redirect them to login again.
    newUserSchema.parse(newUser);
    const hashedPassword = hashValue(newUser.password);
    await db.insert(usersTable).values({...newUser, password: hashedPassword});
}