import { Request, Response } from "express";
import { sendInvite, acceptInvite, declineInvite } from "../service/invite.service";

export const invite = async (req: Request<{} ,{}, {groupId:number, invitee:string, groupName:string}>, res: Response) =>{
    const {invitee, groupId, groupName} = req.body;
    // @ts-ignore
    const userId = req.userId;
    await sendInvite(invitee, groupId, userId, groupName);
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