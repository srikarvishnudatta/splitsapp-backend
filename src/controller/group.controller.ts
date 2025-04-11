import { Request, Response } from "express";
import {
    createGroup, deleteGroupService, getGroupByIdService, getGroupMembers,
} from "../service/group.service";
import {InviteData, NewGroupBody, NewGroupData} from "../lib/types/types";
import {acceptInvite, getInvitesFromTable, sendInvite} from "../service/invite.service";

const getAllGroups = async (req: Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    const groups = await getGroupMembers(userId);
    return res.status(200).send(groups);
}
const createNewGroup = async (req: Request<{}, {}, NewGroupBody>, res: Response) =>{
    // @ts-ignore
    const owner = req.userId;
    const {group_name} = req.body
    const groupData: NewGroupData = {
        group_name,
        owner,
    }
    const result = await createGroup(groupData)
    return res.status(201).send({msg: "group created", ...result});
}
const getGroupById = async (req: Request, res: Response) => {
    // @ts-ignore
    const groupId = parseInt(req.params.groupId);
    const result = await getGroupByIdService(groupId);
    return res.status(200).send({group: {...result[0]}})
}
const deleteGroup = async (req: Request, res:Response) =>{
    const groupId = parseInt(req.params.groupId);
    await deleteGroupService(groupId);
    return res.status(200).send("ok deleted");
}
const inviteHandler = async (req:Request<{}, {}, InviteData>, res: Response)=>{
    // @ts-ignore
    const userId = req.userId;
    const {receiver, groupId} = req.body;
    await sendInvite(receiver, groupId, userId);
    return res.status(201).send({message: "Invite Sent!"});
}
const allInvitesHandler = async (req:Request, res:Response)=>{
    // @ts-ignore
    const userId = req.userId;
    const allInvites = await getInvitesFromTable(userId);
    return res.status(200).send({invites: allInvites})
}
const acceptInviteHandler = async (req: Request, res:Response)=>{
    // @ts-ignore
    const userId = req.userId;
    const groupId = parseInt(req.params.groupId);
    await acceptInvite(userId, groupId);
    return res.status(200).send({message: "Invite Accepted"});
}
export {getGroupById, getAllGroups, createNewGroup, deleteGroup, inviteHandler, allInvitesHandler, acceptInviteHandler}

