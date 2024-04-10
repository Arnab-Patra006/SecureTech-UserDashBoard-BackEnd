import { Router } from "express";
import contactcontroller from '../controllers/contact.controller';
const contactRouter=Router();
// contactRouter.get("/all",contactcontroller.showAllIssues);//not needed
contactRouter.post("",contactcontroller.createIssue);

export default contactRouter;