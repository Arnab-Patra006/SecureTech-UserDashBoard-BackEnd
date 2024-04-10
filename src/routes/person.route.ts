import { Router } from "express";
import otherdetailsController from "../controllers/otherdetails.controller";
import personController from "../controllers/person.controller";

const personRouter = Router();
personRouter.post("/save", personController.savePersonData);
personRouter.get("/all", personController.getAllPersons);
personRouter.get("/:id", personController.getPersonData);
// personRouter.get("/:id/other", otherdetailsController.getPersonOtherDetails); //not needed
// personRouter.post("/save/all",personController.saveAllPersonData); //not needed

export default personRouter;
