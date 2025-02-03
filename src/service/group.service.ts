import {groupTable, InsertGroupTable} from "../db/schemas/groups";
import db from "../db";
import {and, eq} from "drizzle-orm";
import {newGroupSchema} from "../lib/zod.schemas";


export const createGroup = async (newGroup: InsertGroupTable) => {
    newGroupSchema.parse(newGroup);
    await db.insert(groupTable).values({...newGroup});
    return true;
}
const getAllGroups = async (userId:number) =>{
    return db.select().from(groupTable).where(eq(groupTable.member, userId));
}
export const getGroupsByOwner = async (userId:number) =>{
    const allGroups = await getAllGroups(userId);
    // for all the group_ids in where, fetch from group table.
    return allGroups.filter((grp) => grp.is_owner === true);
}
export const getGroupMembers = async (userId: number) =>{
    const allGroups = await getAllGroups(userId);
    // for all the group_ids in where, fetch from group table.
    return allGroups.filter((grp) => grp.is_owner === false);
}
const inviteToGroup = () => {
    // i need a group_id, user_id [whom i am inviting], their email, some generated token, status = "invited", expires in 24hr?

}
const acceptInvite = () => {
    // i need group_id, user_id, update relationships table, check if he is owner by if user_id already exists
    // if not add him as a member [set isowner : false]
}
const declineInvite = () =>{
    // take the group_id, user_id, update the relationships table status: declined/rejected
}