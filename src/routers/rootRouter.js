import express from "express";
import {getJoin, getLogin, postJoin, postLogin} from "../Controllers/userController";
import {search, home} from "../Controllers/videoController";

const rootRouter = express.Router();

const handleHome = (req, res) => res.send("Home");
const handleJoin = (req, res) => res.send("Join");

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;

