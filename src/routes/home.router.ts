import {Router} from "express";
import {errorWrapper} from "../lib/util/errorWrapper";
import {getHomeData, getProfileData} from "../controller/home.controller";

const homeRouter =  Router();

homeRouter.get("/profile", errorWrapper(getProfileData));
homeRouter.get("/home", errorWrapper(getHomeData));

export default homeRouter;