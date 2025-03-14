import { Router } from "express";
import { errorWrapper } from "../lib/errorWrapper";
import {createNewGroup, getAllGroups} from "../controller/group.controller";
import { invite, accept, decline, allInvites } from "../controller/invite.controller";

const groupRouter = Router();

// group paths
groupRouter.get("/", errorWrapper(getAllGroups));
groupRouter.post("/new", errorWrapper(createNewGroup));


// invite paths
groupRouter.post("/sendInvite/", errorWrapper(invite));
groupRouter.get("/invites", errorWrapper(allInvites))
groupRouter.get("/:groupId/invite/accept", errorWrapper(accept));
groupRouter.get("/:groupId/invite/decline", errorWrapper(decline));

export default groupRouter;