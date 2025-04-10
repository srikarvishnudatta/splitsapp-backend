import { Request, Response } from "express";
import {
    createGroup, deleteGroupService, getGroupByIdService, getGroupMembers,
} from "../service/group.service";
import {NewGroupBody, NewGroupData} from "../lib/types/types";

const getAllGroups = async (req: Request, res: Response) =>{
    // @ts-ignore
    const userId = req.userId;
    const groups = await getGroupMembers(userId);
    return res.status(200).send(groups);
}
const createNewGroup = async (req: Request<{}, {}, NewGroupBody>, res: Response) =>{
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
const getGroupById = async (req: Request, res: Response) => {
    // @ts-ignore
    const groupId = parseInt(req.params.groupId);
    const result = await getGroupByIdService(groupId);
    return res.status(200).send({group: {...result[0]}})
}
const deleteGroup = async (req: Request, res:Response) =>{
    const groupId = parseInt(req.params.groupId);
    await deleteGroupService(groupId);
    return res.status(200).send("ok deleted");
}
export {getGroupById, getAllGroups, createNewGroup, deleteGroup}

