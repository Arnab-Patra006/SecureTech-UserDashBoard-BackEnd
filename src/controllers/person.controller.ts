import { Request, Response } from "express";
import AppDataSource from "../config/db_config";
import { Person } from "../entities/Person";
import { PersonInterface } from "../interfaces/PersonInterface";

const personRepo = AppDataSource.getRepository(Person);

const savePersonData = async (req: Request, res: Response) => {
  const p = req.body;
  try {
    await personRepo.save(p);

    res.status(201).json({ message: "Person details saved successfully", p });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      message: "Something is wrong in the API call",
      error: err.message,
    });
  }
};

const saveAllPersonData = async (req: Request, res: Response) => {
  const persons = req.body;
  try {
    const savedPersons = await Promise.all(
      persons.map((person: PersonInterface) => personRepo.save(person))
    );
    res.status(201).json({ message: "all person data saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something wrong" });
  }
};

const getPersonData = async (req: Request, res: Response) => {
  const pid = parseInt(req.params.id);
  try {
    const person = await personRepo.findOne({
      where: { id: pid },
      relations: {
        hair: true,
        address: true,
        company: true,
        crypto: true,
        bank: true,
      },
    });
    res.status(200).json(person);
  } catch (err) {
    res
      .status(400)
      .json({ message: `No Such Person found with id ${pid}`, err });
  }
};

const getAllPersons = async (req: Request, res: Response) => {
  try {
    const all = await personRepo.find({
      relations: {
        hair: true,
        address: true,
        company: true,
        crypto: true,
        bank: true,
      },
    });
    res.status(200).json(all);
  } catch (err) {
    res.status(401).send("Can't fetch all person data");
  }
};

export default {
  savePersonData,
  getPersonData,
  getAllPersons,
  saveAllPersonData,
};
