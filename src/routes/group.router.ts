import { Router } from "express";
import { errorWrapper } from "../lib/errorWrapper";
import {accept, createNewGroup, decline, getAllGroups, getInvites, invite} from "../controller/group.controller";

const groupRouter = Router();

groupRouter.get("/", errorWrapper(getAllGroups));
groupRouter.post("/newGroup", errorWrapper(createNewGroup));
//body has sender email, extract sender_user_id from token and use it here
groupRouter.post("/invite/:groupId", errorWrapper(invite));
groupRouter.get("/invite/:groupId/verify/:token/expiresAt?=");
// whoever is the receiver here make them isowner: false in relations, sent invitation to accepted
groupRouter.get("/invites/", errorWrapper(getInvites))
groupRouter.get("/invite/:groupId/verify/accept", errorWrapper(accept));
groupRouter.get("/invite/:groupId/verify/decline", errorWrapper(decline));

export default groupRouter;