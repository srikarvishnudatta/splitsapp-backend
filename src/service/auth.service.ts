import { usersTable, InsertUserType, SelectUserType, verificationTable, InsertVerificationTable } from "../db/schemas/users";
import db from "../db";
import { compareValues, hashValue } from "../lib/brcypt";
import { eq } from "drizzle-orm";
import appAssert from "../lib/appAssert";
import { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND } from "../lib/httpStatusCode";
import { newUserSchema } from "../lib/zod.schemas";
import { setSession } from "./session.service";
import { issueToken } from "../lib/jwt";
import { getOneDayFromNow } from "../lib/date";
import { sendEmail } from "./email.service";

export const loginUser = async (user: SelectUserType, userAgent?:string) => {
    const userFound = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
    appAssert(userFound, NOT_FOUND, "User not found!");
   //  appAssert(userFound[0].is_verified, BAD_REQUEST, "User not verified");
    appAssert(!compareValues(user.password, userFound[0].password), BAD_REQUEST, "Invalid password!");
    // create a new session, then issue a new jwt token.
    const {id: session_id} = (await setSession(userFound[0].id, userAgent))[0];
    const accesstoken = issueToken({
        userId: userFound[0].id,
        sessionId: session_id
    });
    return accesstoken;
}
export const createUser = async (newUser: InsertUserType) =>{
    const userFound = await db.select().from(usersTable).where(eq(usersTable.email, newUser.email));
    appAssert(userFound, CONFLICT, "email already exists!");
    newUserSchema.parse(newUser);
    const hashedPassword = hashValue(newUser.password);
    const {email} = {...newUser};
    await db.insert(usersTable).values({...newUser, password: hashedPassword});
    const expires_at = getOneDayFromNow();
    const url = `http://localhost:5173/auth/verify?email=${email}&expiresAt=${expires_at.getTime()}`;
    sendEmail(
        {
            to: email,
subject:"join Splits today",
text:"click on the link to verify your account",
html: `<p>${url}</p>`
          }
    );
    await db.insert(verificationTable).values({email, expiresAt: expires_at});
}
export const verifyUser = async (email:string, expiresAt: string) =>{
    const compareDate = Date.now() > new Date(expiresAt).getTime()
    appAssert(!compareDate, BAD_REQUEST, "Sorry the link expired");
    const result = await db.select().from(verificationTable).where(eq(verificationTable.email, email));
    appAssert(result, FORBIDDEN, "you havent created an account");
    // update user table to verified
    await db.update(usersTable).set({is_verified: true}).where(eq(usersTable.email, email));
    await db.delete(verificationTable).where(eq(verificationTable.email, email));
}   