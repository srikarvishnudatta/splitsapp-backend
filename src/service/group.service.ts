import { groupMembershipsTable, groupTable} from "../db/schemas/groups";
import db from "../db";
import {eq} from "drizzle-orm";
import {NewGroupData} from "../lib/types/types";


const createGroup = async (newGroup: NewGroupData) => {
    const members:number[] = [];
    members.push(newGroup.owner);
    const result  = await db.insert(groupTable).values({...newGroup, members}).returning({id: groupTable.id});
    await db.insert(groupMembershipsTable).values({group_id: result[0].id, user_id:newGroup.owner, is_owner:true});
}
const getGroupMembers = async (userId: number) =>{
    // filter out the necessary content for fetch
    return db
        .select({group_id: groupTable.id,
            name:groupTable.group_name, members: groupTable.members,
            owner: groupMembershipsTable.is_owner,
        created_at: groupTable.created_at})
        .from(groupTable)
        .innerJoin(groupMembershipsTable, eq(groupTable.id, groupMembershipsTable.group_id))
        .where(eq(groupMembershipsTable.user_id, userId));
}
const getGroupByIdService = async (groupId: number) =>{
    return db.select().from(groupTable).where(eq(groupTable.id, groupId));
}
const deleteGroupService = async (groupId:number) =>{
    await db.delete(groupMembershipsTable).where(eq(groupTable.id,groupId));
    await db.delete(groupTable).where(eq(groupTable.id, groupId));
}
export {createGroup, getGroupByIdService, getGroupMembers, deleteGroupService}
