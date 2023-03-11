import express from "express";
import {join} from "../Controllers/userController";
import {trending} from "../Controllers/videoController";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");
const handleJoin = (req, res) => res.send("Join");

globalRouter.get("/", trending);
globalRouter.get("/join", join);

export default globalRouter;

