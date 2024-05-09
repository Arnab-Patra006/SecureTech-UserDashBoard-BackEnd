import { Router } from "express";
import contactcontroller from '../controllers/contact.controller';
const contactRouter=Router();
contactRouter.post("",contactcontroller.createIssue);

export default contactRouter;