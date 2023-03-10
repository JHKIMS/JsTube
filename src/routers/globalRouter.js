import express from "express";
import {join, login} from "../Controllers/userController";
import {search, home} from "../Controllers/videoController";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");
const handleJoin = (req, res) => res.send("Join");

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;

