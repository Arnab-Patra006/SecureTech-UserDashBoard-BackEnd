import { Request, Response } from "express";
import AppDataSource from "../config/db_config";
import { Address } from "../entities/Address";
import { Bank } from "../entities/Bank";
import { Company } from "../entities/Company";
import { Crypto } from "../entities/Crypto";
import { Hair } from "../entities/Hair";

const companyRepo = AppDataSource.getRepository(Company);
const addressRepo = AppDataSource.getRepository(Address);
const hairRepo = AppDataSource.getRepository(Hair);
const bankRepo = AppDataSource.getRepository(Bank);
const cryptoRepo = AppDataSource.getRepository(Crypto);

const getPersonOtherDetails = async (req: Request, res: Response) => {
  const cid = parseInt(req.params.id);
  try {
    const company = await companyRepo.findOne({ where: { companyid: cid } });
    let companyAdd;
    if (company) {
      companyAdd = await addressRepo.findOne({ where: { addressid: cid + 1 } });
    }
    const address = await addressRepo.findOne({ where: { addressid: cid } });
    const hair = await hairRepo.findOne({ where: { hairid: cid } });
    const bank = await bankRepo.findOne({ where: { bankid: cid } });
    const crypto = await cryptoRepo.findOne({ where: { cryptoid: cid } });

    res.status(200).json({
      hair: hair,
      bank: bank,
      crypto: crypto,
      company: {
        address: companyAdd,
        department: company?.department,
        title: company?.title,
        name: company?.name,
        companyid: company?.companyid,
      },
      address: address,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
export default { getPersonOtherDetails };
