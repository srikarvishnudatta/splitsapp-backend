import {z} from "zod";
import { groupMembershipsTable, groupTable, InsertGroupTable } from "../db/schemas/groups";
import db from "../db";
import { eq } from "drizzle-orm";
const newGroupSchema = z.object({
    group_name: z.string().min(1).max(10),
    user_id: z.number()
});

const createGroup = async (newGroup: InsertGroupTable) => {
    newGroupSchema.parse(newGroup);
    await db.insert(groupTable).values({...newGroup});
    return true;
}
const getGroupOwner = async () =>{
    const owners = await db.select().from(groupMembershipsTable).where(eq(groupMembershipsTable.is_owner, true));
    // for all the group_ids in where, fetch from group table.
    return owners;
}
const getGroupMembers = async () =>{
    const members = await db.select().from(groupMembershipsTable).where(eq(groupMembershipsTable.is_owner, false));
    // for all the group_ids in where, fetch from group table.
    return members;
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