import { usersTable, InsertUserType, SelectUserType } from "../db/schemas/users";
import db from "../db";
import {z} from "zod";
import { hashValue } from "../lib/brcypt";
import { eq } from "drizzle-orm";

const newUserSchema = z.object({
    email: z.string().min(1).max(50),
    password: z.string().min(1).max(20),
    first_name: z.string().min(1).max(20),
    last_name: z.string().min(1).max(20),
});

export const loginUser = async (user: SelectUserType) => {
    const userFound = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
    return userFound;
}
export const createUser = async (newUser: InsertUserType) =>{
    newUserSchema.parse(newUser);
    const hashedPassword = hashValue(newUser.password);
    await db.insert(usersTable).values({...newUser, password: hashedPassword});
}