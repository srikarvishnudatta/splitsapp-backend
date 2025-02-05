import {groupInvitationsTable, groupMembershipsTable, groupTable} from "../db/schemas/groups";
import db from "../db";
import {newGroupSchema} from "../lib/zod.schemas";
import {NewGroupData} from "../controller/group.controller";
import {getOneDayFromNow} from "../lib/date";
import {usersTable} from "../db/schemas/users";
import {and, eq} from "drizzle-orm";
import appAssert from "../lib/appAssert";
import {NOT_FOUND} from "../lib/httpStatusCode";


export const createGroup = async (newGroup: NewGroupData) => {
    newGroupSchema.parse(newGroup);
    await db.insert(groupTable).values({...newGroup});
}
export const sendInvite = async (invitee:string, groupId:number, senderId:number)=>{
    const receiver_id = await db.select({id: usersTable.id}).from(usersTable).where(eq(usersTable.email, invitee));
    appAssert(receiver_id, NOT_FOUND, "user not found");
    const receiver = receiver_id[0].id
    await db
        .insert(groupInvitationsTable)
        .values({group_id: groupId,
            sender_id: senderId,
            receiver_id: receiver,
            status: "invited",
            expires_at: getOneDayFromNow()});
}

export const getGroupsByOwner = async (userId:number) =>{
    // for all the group_ids in where, fetch from group table.
    return db.select().from(groupTable).where(eq(groupTable.owner, userId))
    // return allGroups.filter((grp) => grp.is_owner === true);
}
export const getGroupMembers = async (userId: number) =>{
    // for all the group_ids in where, fetch from group table.
    return db
        .select()
        .from(groupTable)
        .innerJoin(groupMembershipsTable, eq(groupTable.id, groupMembershipsTable.group_id))
        .where(eq(groupMembershipsTable.is_owner, false));
    // return allGroups.filter((grp) => grp.is_owner === false);
}
export const getInvitesFromTable = async (userId: number) =>{
    return db.select()
        .from(groupInvitationsTable)
        .where(and(eq(groupInvitationsTable.receiver_id, userId), eq(groupInvitationsTable.status, "invited")));
}
export const acceptInvite = async (userid: number, groupId:number) => {
    // i need group_id, user_id, update relationships table, check if he is owner by if user_id already exists
    await db.update(groupInvitationsTable).set({status:"accepted"})
        .where(and(eq(groupInvitationsTable.receiver_id, userid), eq(groupInvitationsTable.group_id, groupId)));
    const query =
        await db.select({members: groupTable.members}).from(groupTable).where(eq(groupTable.id, groupId));
    const members = query[0].members;
    members.push(userid);
    await db.insert(groupMembershipsTable).values({group_id: groupId, user_id: userid, is_owner: false});
    await db.update(groupTable).set({members}).where(eq(groupTable.id, groupId));
}
export const declineInvite = async (userId: number, groupId:number) =>{
    // take the group_id, user_id, update the relationships table status: declined/rejected
    await db.update(groupInvitationsTable).set({status: "rejected"})
        .where(and(eq(groupInvitationsTable.receiver_id, userId), eq(groupInvitationsTable.group_id, groupId)));
}
const cancelInvite = () =>{

}