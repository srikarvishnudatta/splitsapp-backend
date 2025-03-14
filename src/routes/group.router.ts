import { Router } from "express";
import { errorWrapper } from "../lib/errorWrapper";
import {createNewGroup, getAllGroups} from "../controller/group.controller";
import { invite, accept, decline } from "../controller/invite.controller";

const groupRouter = Router();

groupRouter.get("/", errorWrapper(getAllGroups));
groupRouter.post("/new", errorWrapper(createNewGroup));
//body has sender email, extract sender_user_id from token and use it here
groupRouter.post("/invite/", errorWrapper(invite));
// whoever is the receiver here make them isowner: false in relations, sent invitation to accepted
groupRouter.get("/invite/:groupId/verify/accept", errorWrapper(accept));
groupRouter.get("/invite/:groupId/verify/decline", errorWrapper(decline));

export default groupRouter;