import {Request, Response} from "express";
import {getGroupMembers} from "../service/group.service";


export const getHomeData = async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;
    const groupData = await getGroupMembers(userId);
    return res.status(200).json({groupData});
}
export const getProfileData = async (req:Request, res: Response) =>{
    //@ts-ignore
    const userId = req.userId;
    return res.status(200).json({userId});
}