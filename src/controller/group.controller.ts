import { Request, Response } from "express";
import {
    createGroup, getGroupMembers,
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

