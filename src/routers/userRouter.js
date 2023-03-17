import express from "express";
import { editUser, deleteUser, see, logout, startGithubLogin } from "../Controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/github/start", startGithubLogin)
userRouter.get(":id", see);
userRouter.get("/logout", logout);

export default userRouter;