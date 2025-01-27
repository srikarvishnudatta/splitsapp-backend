import { Router } from "express";
import { errorWrapper } from "../lib/errorWrapper";
import { getAllGroups } from "../controller/group.controller";

const groupRouter = Router();

groupRouter.get("/", errorWrapper(getAllGroups));
groupRouter.post("/newGroup");
//body has sender email, extract sender_user_id from token and use it here
groupRouter.post("/invite/:groupId");
groupRouter.post("/invite/:groupId/verify/:token/expiresAt?=");
// whoever is the receiver here make them isowner: false in relations, sent invitation to accepted
groupRouter.get("/invite/:groupId/verify/:token/accept");
groupRouter.get("/invite/:groupId/verify/:token/decline");

export default groupRouter;