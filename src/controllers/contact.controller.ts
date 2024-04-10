import { Request, Response } from "express";
import AppDataSource from "../config/db_config";
import { Contact } from "../entities/Contact";

const contactRepo = AppDataSource.getRepository(Contact);

const showAllIssues = async (req: Request, res: Response) => {
  const allIssues = await contactRepo.find();
  res.json(allIssues);
};
const createIssue = async (req: Request, res: Response) => {
  await contactRepo.save(req.body);
  res.status(201).send("Issue Submitted Successfully");
};
export default { showAllIssues, createIssue };
