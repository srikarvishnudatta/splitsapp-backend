import {Request, Response} from "express";
import {getUserById} from "../service/auth.service";
import {getInvitesFromTable} from "../service/group.service";

export const getHomeData = async (req: Request, res: Response) => {

}
export const getProfileData = async (req:Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    const user = await getUserById(userId);
    const result = await getInvitesFromTable(userId);
    return res.status(200).send({
        user,
        invites: result
    });
}