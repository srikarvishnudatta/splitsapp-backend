import { eq, and, count } from "drizzle-orm";
import db from "../db";
import { groupInvitationsTable, groupTable, groupMembershipsTable } from "../db/schemas/groups";
import { usersTable } from "../db/schemas/users";
import appAssert from "../lib/appAssert";
import { getOneDayFromNow } from "../lib/date";
import { NOT_FOUND } from "../lib/httpStatusCode";

const sendInvite = async (receiver:string, groupId:number, senderId:number)=>{
    const receiver_id = 
    await db.select({id: usersTable.id})
    .from(usersTable)
    .where(eq(usersTable.email, receiver));
    appAssert(receiver_id, NOT_FOUND, "user not found");

    const groupData = await db.select({groupName: groupTable.group_name}).from(groupTable).where(eq(groupTable.id, groupId));
    appAssert(groupData, NOT_FOUND, "group doesnt exist");
    const groupName = groupData[0].groupName;
    const receiver_data = receiver_id[0].id;
    const senderName = await db.select({name: usersTable.first_name}).from(usersTable).where(eq(usersTable.id, senderId));
    await db
        .insert(groupInvitationsTable)
        .values({
            sender_id: senderId,
            sender_name: senderName[0].name,
            receiver_id: receiver_data,
            group_id: groupId,
            group_name:groupName,
            status: "invited",
            expires_at: getOneDayFromNow()});
}
const getInvitesCount = async (userId : number)=>{
    return db.select({count: count()})
    .from(groupInvitationsTable)
    .where(and(eq(groupInvitationsTable.receiver_id, userId), eq(groupInvitationsTable.status, "invited")));

}

const getInvitesFromTable = async (userId: number) =>{
    return db.select({groupId: groupInvitationsTable.group_id,
        groupName:groupInvitationsTable.group_name,
        senderName: groupInvitationsTable.sender_name
    })
        .from(groupInvitationsTable)
        .where(and(eq(groupInvitationsTable.receiver_id, userId), eq(groupInvitationsTable.status, "invited")));
}
const acceptInvite = async (userid: number, groupId:number) => {
    const query =
        await db.select({members: groupTable.members}).from(groupTable).where(eq(groupTable.id, groupId));
    const members = query[0].members;
    members.push(userid);
    await db.insert(groupMembershipsTable).values({group_id: groupId, user_id: userid, is_owner: false});
    await db.update(groupTable).set({members}).where(eq(groupTable.id, groupId));
    await db.update(groupInvitationsTable).set({status:"accepted"})
        .where(and(eq(groupInvitationsTable.receiver_id, userid), eq(groupInvitationsTable.group_id, groupId)));
}
const declineInvite = async (userId: number, groupId:number) =>{
    await db.update(groupInvitationsTable).set({status: "rejected"})
        .where(and(eq(groupInvitationsTable.receiver_id, userId), eq(groupInvitationsTable.group_id, groupId)));
}
const cancelInvite = () =>{

}

export {sendInvite, acceptInvite, getInvitesFromTable, getInvitesCount, declineInvite, cancelInvite}