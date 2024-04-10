import { Router } from "express";
import userController from "../controllers/user.controller";
import usercontroller from "../controllers/user.controller";
const userRouter = Router();
userRouter.post("", usercontroller.register);
// userRouter.get("/all",usercontroller.allUsers); //not needed
userRouter.post("/login",userController.login);
// userRouter.post("/all",userController.registerAll); //not needed
export default userRouter;
