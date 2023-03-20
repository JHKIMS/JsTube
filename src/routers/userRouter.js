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
  getChangePassword,
  postChangePassword,
} from "../Controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middleware";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEditUser)
  .post(avatarUpload.single("avatar") ,postEditUser);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get(":id", see);
userRouter.get("/logout", protectorMiddleware, logout);

userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
