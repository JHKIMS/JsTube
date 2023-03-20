import express from "express";
import {
  editUser,
  deleteUser,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
  getEditUser,
  postEditUser,
} from "../Controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEditUser)
  .post(postEditUser);
userRouter.get("/github/start",publicOnlyMiddleware,startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);
userRouter.get(":id", see);
userRouter.get("/logout", protectorMiddleware, logout);

export default userRouter;
