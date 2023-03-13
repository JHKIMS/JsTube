import express from "express";
import {watch, deleteVideo, upload, getEdit, postEdit, getUpload, postUpload} from "../Controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

videoRouter.get("/:id(\\d+)/delete", deleteVideo);


export default videoRouter;