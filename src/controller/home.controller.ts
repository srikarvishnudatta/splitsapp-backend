import {Request, Response} from "express";
import {getUserById} from "../service/auth.service";
import {getInvitesCount} from "../service/invite.service";
import { getGroupMembers } from "../service/group.service";

export const getHomeData = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId;
    const groups = await getGroupMembers(userId);
    return res.status(200).send(groups);
}
export const getProfileData = async (req:Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    const user = await getUserById(userId);
    const result = await getInvitesCount(userId);
    return res.status(200).send({
        ...user,
        invitesCount: result
    });
}