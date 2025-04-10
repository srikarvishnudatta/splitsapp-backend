import { Router } from "express";
import { errorWrapper } from "../lib/util/errorWrapper";
import {createNewGroup, deleteGroup, getAllGroups, getGroupById} from "../controller/group.controller";

const groupRouter = Router();

// group paths
groupRouter.get("/", errorWrapper(getAllGroups));
groupRouter.post("/new", errorWrapper(createNewGroup));
groupRouter.get("/:groupId", errorWrapper(getGroupById));
groupRouter.delete("/:groupId", errorWrapper(deleteGroup))

export default groupRouter;