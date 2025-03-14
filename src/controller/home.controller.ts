import {Request, Response} from "express";
import {getUserById} from "../service/auth.service";
import {getInvitesCount} from "../service/invite.service";

export const getHomeData = async (req: Request, res: Response) => {
    
}
export const getProfileData = async (req:Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    const user = await getUserById(userId);
    const result = await getInvitesCount(userId);
    return res.status(200).send({
        user,
        invitesCount: result
    });
}