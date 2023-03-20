import express from "express";
import { editUser, deleteUser, see, logout, startGithubLogin, finishGithubLogin, getEditUser, postEditUser } from "../Controllers/userController";

const userRouter = express.Router();

userRouter.route("/edit").get(getEditUser).post(postEditUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get(":id", see);
userRouter.get("/logout", logout);

export default userRouter;