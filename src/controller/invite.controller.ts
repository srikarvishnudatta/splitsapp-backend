import { Request, Response } from "express";
import { sendInvite, acceptInvite, declineInvite, getInvitesFromTable } from "../service/invite.service";

 const invite = async (req: Request<{} ,{}, {groupId:number, invitee:string}>, res: Response) =>{
    const {invitee, groupId} = req.body;
    // @ts-ignore
    const userId = req.userId;
    await sendInvite(invitee, groupId, userId);
    return res.status(200).send({msg: "invite sent"});
}
 const accept = async (req: Request, res: Response)=>{
    // @ts-ignore
    const userId= req.userId;
    const groupId = parseInt(req.params.groupId)
    await acceptInvite(userId, groupId)
    return res.status(200).send({msg: "invite accepted"})
}
 const decline = async (req: Request, res: Response)=>{
    // @ts-ignore
    const userId = req.userId;
    const groupId =  parseInt(req.params.groupId)
    await declineInvite(userId, groupId);
    return res.status(200).send({msg: "invite declined"})
}
const allInvites = async (req: Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    const response = await getInvitesFromTable(userId);
    return res.status(200).send(response)
}

export {allInvites, invite, decline, accept}