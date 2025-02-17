import { Request, Response } from "express";
import {
    acceptInvite,
    createGroup, declineInvite,
    getGroupMembers,
    getGroupsByOwner,
    getInvitesFromTable,
    sendInvite
} from "../service/group.service";
export interface NewGroupData{
    group_name:string;
}

export const getAllGroups = async (req: Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    // call the table to find the owners
    const owners = await getGroupsByOwner(userId);
    // call the member to find the members
    const members = await getGroupMembers(userId);
    return res.status(200).send({owners, members});
}
export const createNewGroup = async (req: Request<{}, {}, NewGroupData>, res: Response) =>{
    // @ts-ignore
    const owner = req.userId;
    const {group_name} = req.body
    const groupData = {
        group_name,
        owner,
    }
    await createGroup(groupData)
    return res.status(201).send({msg: "group created"});
}
export const getInvites = async (req: Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    const result = await getInvitesFromTable(userId);
    return res.status(200).send(result);
}
export const invite = async (req: Request<{} ,{}, {groupId:number, invitee:string}>, res: Response) =>{
    const {invitee, groupId} = req.body;
    // @ts-ignore
    const userId = req.userId;
    await sendInvite(invitee, groupId, userId);
    return res.status(200).send({msg: "invite sent"});
}
export const accept = async (req: Request, res: Response)=>{
    // @ts-ignore
    const userId= req.userId;
    const groupId = parseInt(req.params.groupId)
    await acceptInvite(userId, groupId)
    return res.status(200).send({msg: "invite accept"})
}
export const decline = async (req: Request, res: Response)=>{
    // @ts-ignore
    const userId = req.userId;
    const groupId =  parseInt(req.params.groupId)
    await declineInvite(userId, groupId);
    return res.status(200).send({msg: "invited declined"})
}