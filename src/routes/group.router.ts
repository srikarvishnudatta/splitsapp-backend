import { Router } from "express";
import { errorWrapper } from "../lib/errorWrapper";
import { getAllGroups } from "../controller/group.controller";

const groupRouter = Router();

groupRouter.get("/", errorWrapper(getAllGroups));

export default groupRouter;