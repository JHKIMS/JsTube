import express from "express";
import { editUser, deleteUser } from "../Controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);

export default userRouter;