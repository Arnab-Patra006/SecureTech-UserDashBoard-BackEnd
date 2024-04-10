import { Router } from "express";
import contactrouter from "../routes/contact.route";
import personRouter from "./person.route";
import userRouter from "./user.route";

const routes = Router();
routes.use("/contact", contactrouter);
routes.use("/user", userRouter);
routes.use("/person",personRouter);

export default routes;
