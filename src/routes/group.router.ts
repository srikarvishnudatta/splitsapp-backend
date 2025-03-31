import { Router } from "express";
import { errorWrapper } from "../lib/errorWrapper";
import {createNewGroup, getAllGroups, getGroupById} from "../controller/group.controller";
import { invite, accept, decline, allInvites } from "../controller/invite.controller";

const groupRouter = Router();

// group paths
groupRouter.get("/", errorWrapper(getAllGroups));
groupRouter.post("/new", errorWrapper(createNewGroup));
groupRouter.get("/:groupId", errorWrapper(getGroupById));

// invite paths
groupRouter.post("/sendInvite/", errorWrapper(invite));
groupRouter.get("/invites", errorWrapper(allInvites))
groupRouter.get("/:groupId/invite/accept", errorWrapper(accept));
groupRouter.get("/:groupId/invite/decline", errorWrapper(decline));

export default groupRouter;