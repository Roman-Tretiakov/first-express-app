import {Router} from "express";
import {EndpointList} from "../../constants/endpoint-list";
import {getVideoListHandler} from "./handlers/get-video-list.handler";
import {getVideoHandler} from "./handlers/get-video.handler";
import {postVideoHandler} from "./handlers/post-video.handler";
import {putVideoHandler} from "./handlers/put-video.handler";
import {deleteVideoHandler} from "./handlers/delete-video.handler";

export const videosRouter = Router({});

videosRouter
// videos crud routes:
.get("", getVideoListHandler)
.get(EndpointList.SINGLE_VIDEO, getVideoHandler)
.post("", postVideoHandler)
.put(EndpointList.SINGLE_VIDEO, putVideoHandler)
.delete(EndpointList.SINGLE_VIDEO, deleteVideoHandler);