import { Request, Response } from "express";
import {getGroupMembers, getGroupsByOwner} from "../service/group.service";

export const getAllGroups = async (req: Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    // call the table to find the owners
    const owners = await getGroupsByOwner(userId);
    // call the member to find the members
    const members = await getGroupMembers(userId);
    return res.status(200).send({owners, members});
}
