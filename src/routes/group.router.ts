import { Router } from "express";
import { errorWrapper } from "../lib/util/errorWrapper";
import {
    acceptInviteHandler,
    allInvitesHandler,
    createNewGroup,
    deleteGroup,
    getAllGroups,
    getGroupById,
    inviteHandler,
} from "../controller/group.controller";

const groupRouter = Router();

// group paths
groupRouter.get("/", errorWrapper(getAllGroups));
groupRouter.post("/new", errorWrapper(createNewGroup));
// groupRouter.get("/:groupId", errorWrapper(getGroupById));
groupRouter.delete("/:groupId", errorWrapper(deleteGroup));

//invite paths
groupRouter.get("/invites", errorWrapper(allInvitesHandler));
groupRouter.post("/invite", errorWrapper(inviteHandler));
groupRouter.get("/invites/accept/:groupId", errorWrapper(acceptInviteHandler));

export default groupRouter;