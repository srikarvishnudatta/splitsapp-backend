import { usersTable, InsertUserType, SelectUserType, verificationTable } from "../db/schemas/users";
import db from "../db";
import { compareValues, hashValue } from "../lib/brcypt";
import { eq } from "drizzle-orm";
import appAssert from "../lib/appAssert";
import { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "../lib/httpStatusCode";
import { newUserSchema } from "../lib/zod.schemas";
import { setSession } from "./session.service";
import { issueToken } from "../lib/jwt";
import { getOneDayFromNow, tenMinsFromNow } from "../lib/date";
import { sendMail } from "./email.service";

export const loginUser = async (user: SelectUserType, userAgent?:string) => {
    const userFound = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
    appAssert(userFound, NOT_FOUND, "User not found!");
   //  appAssert(userFound[0].is_verified, BAD_REQUEST, "User not verified");
    appAssert(compareValues(user.password, userFound[0].password), BAD_REQUEST, "Invalid password!");
    // create a new session, then issue a new jwt token.
    const {id: session_id} = (await setSession(userFound[0].id, userAgent))[0];
    const accesstoken = issueToken({
        userId: userFound[0].id,
        sessionId: session_id
    });
    return accesstoken;
}
export const getUserById = async (userId: number) =>{
    const userFound = await db.select({first_name: usersTable.first_name,
        last_name:usersTable.last_name, email: usersTable.email}).from(usersTable).where(eq(usersTable.id, userId));
    appAssert(userFound, NOT_FOUND, "User does not exist!");
    return userFound[0];
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
    await db.insert(verificationTable).values({email, expiresAt: expires_at, type: "email_verification"});
    sendMail({
        to: email,
subject:"join Splits today",
text:"click on the link to verify your account",
html: `<p>${url}</p>`
    });
}
export const verifyUser = async (
    email:string,
    expiresAt: string
) =>{
    const compareDate = Date.now() > new Date(expiresAt).getTime()
    appAssert(!compareDate, BAD_REQUEST, "Sorry the link expired");
    const result = await db.select().from(verificationTable).where(eq(verificationTable.email, email));
    appAssert(result, FORBIDDEN, "you havent created an account");
    await db.update(usersTable).set({is_verified: true}).where(eq(usersTable.email, email));
    await db.delete(verificationTable).where(eq(verificationTable.email, email));
}   
export const resendVerifyLink = async (email:string) =>{
    const expires_at = getOneDayFromNow();
    await db.insert(verificationTable).values({email, expiresAt: expires_at, type:"email_verification"});
    const url = `http://localhost:5173/auth/verify?email=${email}&expiresAt=${expires_at.getTime()}`
    sendMail({
        to: email,
subject:"Resend: join Splits today",
text:"click on the link to verify your account",
html: `<p>${url}</p>`
    });
}
export const requestResetLink = async (email: string) =>{
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    appAssert(result, NOT_FOUND, "user not found");
    const expires_at = tenMinsFromNow();
    const url = `http://localhost:5173/auth/password/new/submit/email=${email}/expiresAt=${expires_at.getTime()}`
    sendMail({
        to: email,
        subject:"Password Resent Link",
        text:"Please click the link",
        html: `<p>${url}</p>`
        });
    await db.insert(verificationTable).values({email, expiresAt: expires_at, type:"reset_password_verification"});
}
export const newPasswordUpdate = async (email:string, expiresAt:string ,newPassword:string)=>{
    const compareDate = (expiresAt && Date.now() > new Date(expiresAt).getTime());
    appAssert(!compareDate, BAD_REQUEST, "Sorry the link expired or is invalid");
    const query = await db.select().from(verificationTable).where(eq(verificationTable.email, email));
    appAssert(query, UNAUTHORIZED, "cannot change the password");
    const newHashedPassword = hashValue(newPassword);
    await db.update(usersTable).set({password: newHashedPassword}).where(eq(usersTable.email, email));
}