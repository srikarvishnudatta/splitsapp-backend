import { eq } from "drizzle-orm";
import db from "../db"
import { sessionTable } from "../db/schemas/session"
import { getOneMonthFromNow } from "../lib/date"
export const setSession = async (user_id: number, userAgent?:string) => {
    return await db.insert(sessionTable).values(
        {user_id, userAgent, expires_at: getOneMonthFromNow()}
    ).returning({id: sessionTable.id});
}

export const clearSession = async (user_id: number) =>{
    await db.delete(sessionTable).where(eq(sessionTable.user_id, user_id));
}
export const verifySession = async (user_id: number) =>{
    const result = await db.select().from(sessionTable).where(eq(sessionTable.user_id, user_id));
    if(result[0].expires_at.getMilliseconds() < Date.now()) return false;
    return true;
} 