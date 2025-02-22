import { Request, Response } from "express";
import {
    acceptInvite,
    createGroup, declineInvite, getGroupMembers,
    getInvitesFromTable,
    sendInvite
} from "../service/group.service";
import {NewGroupBody, NewGroupData} from "../lib/types/types";

export const getAllGroups = async (req: Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    const groups = await getGroupMembers(userId);
    return res.status(200).send(groups);
}
export const createNewGroup = async (req: Request<{}, {}, NewGroupBody>, res: Response) =>{
    // @ts-ignore
    const owner = req.userId;
    const {group_name} = req.body
    const groupData: NewGroupData = {
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