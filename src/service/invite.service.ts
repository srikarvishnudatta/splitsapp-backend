import { eq, and } from "drizzle-orm";
import db from "../db";
import { groupInvitationsTable, groupTable, groupMembershipsTable } from "../db/schemas/groups";
import { usersTable } from "../db/schemas/users";
import appAssert from "../lib/appAssert";
import { getOneDayFromNow } from "../lib/date";
import { NOT_FOUND } from "../lib/httpStatusCode";

export const sendInvite = async (invitee:string, groupId:number, senderId:number, groupName:string)=>{
    const receiver_id = 
    await db.select({id: usersTable.id})
    .from(usersTable)
    .where(eq(usersTable.email, invitee));
    appAssert(receiver_id, NOT_FOUND, "user not found");
    const receiver = receiver_id[0].id;
    const senderName = await db.select({name: usersTable.first_name}).from(usersTable).where(eq(usersTable.id, senderId));
    await db
        .insert(groupInvitationsTable)
        .values({
            sender_id: senderId,
            sender_name: senderName[0].name,
            receiver_id: receiver,
            group_id: groupId,
            group_name:groupName,
            status: "invited",
            expires_at: getOneDayFromNow()});
}


export const getInvitesFromTable = async (userId: number) =>{
    return db.select({groupId: groupInvitationsTable.group_id,
        groupName:groupInvitationsTable.group_name,
        senderName: groupInvitationsTable.group_name
    })
        .from(groupInvitationsTable)
        .where(and(eq(groupInvitationsTable.receiver_id, userId), eq(groupInvitationsTable.status, "invited")));
}
export const acceptInvite = async (userid: number, groupId:number) => {
    // i need group_id, user_id, update relationships table, check if he is owner by if user_id already exists
    const query =
        await db.select({members: groupTable.members}).from(groupTable).where(eq(groupTable.id, groupId));
    const members = query[0].members;
    members.push(userid);
    await db.insert(groupMembershipsTable).values({group_id: groupId, user_id: userid, is_owner: false});
    await db.update(groupTable).set({members}).where(eq(groupTable.id, groupId));
    await db.update(groupInvitationsTable).set({status:"accepted"})
        .where(and(eq(groupInvitationsTable.receiver_id, userid), eq(groupInvitationsTable.group_id, groupId)));
}
export const declineInvite = async (userId: number, groupId:number) =>{
    // take the group_id, user_id, update the relationships table status: declined/rejected
    await db.update(groupInvitationsTable).set({status: "rejected"})
        .where(and(eq(groupInvitationsTable.receiver_id, userId), eq(groupInvitationsTable.group_id, groupId)));
}
const cancelInvite = () =>{

}