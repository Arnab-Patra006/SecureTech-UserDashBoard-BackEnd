import { NextFunction, Request, Response } from "express";
import AppDataSource from "../config/db_config";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import signJWT from "../functions/signJWT";
import { UserI } from "../interfaces/UserInterface";

const userRepo = AppDataSource.getRepository(User);

const register = async (req: Request, res: Response) => {
  const u = req.body;
  const existingUser = await userRepo.findOne({
    where: { username: u.username },
  });
  if (existingUser) {
    res
      .status(409)
      .json({ message: "Username already exists,Please use different" });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) {
          res.status(500).json({ message: "Error handelling password" });
          return;
        }
        try {
          const newUser = await userRepo.save({
            username: u.username,
            password: hash,
            email: u.email,
            role: u.role,
          });

          res
            .status(201)
            .json({ message: "user registered successfully", user: newUser });
        } catch (err) {
          res.status(500).json({ message: "Error creating user" });
        }
      });
    });
  }
};


const registerAll = async (req: Request, res: Response) => {
    const newUsers = req.body;
    try {
        const savedUsers = await Promise.all(newUsers.map(async (user: UserI) => {
            const existingUser = await userRepo.findOne({ where: { username: user.username } });
            if (existingUser) {
                return { message: "Username already exists. Please use a different one." };
            } else {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(user.password, salt);
                    const newUser = await userRepo.save({
                        username: user.username,
                        password: hash,
                        email: user.email,
                        role: user.role
                    });
                    return { message: "User registered successfully", user: newUser };
                } catch (err) {
                    return { message: "Error creating user", error: err };
                }
            }
        }));
 
        // Send response after Promise.all resolves
        res.status(201).json(savedUsers);
    } catch (err) {
        res.status(500).send(`Can't push all registers: ${err}`);
    }
};


const login = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  const user = await userRepo.findOne({ where: { username: username } });
  if (user == null) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
  } else {
    bcrypt.compare(
      req.body.password,
      user.password,
      (err: any, result: any) => {
        if (err) {
          res.status(500).send({
            message: "failed",
          });
        }
        if (result) {
          signJWT(req.body, (signError, token) => {
            if (signError) {
              return res
                .status(401)
                .json({ message: "Unable to sign JWT", error: signError });
            }

            return res.status(200).json({
              message: "Auth Successful",
              token,
              user: req.body.username,
              role: user.role,
              id: user.signupid,
            });
          });
        } else {
          res.status(500).json({
            messege: `Invalid Credentials`,
          });
        }
      }
    );
  }
};

const allUsers = async (req: Request, res: Response) => {
  const all = await userRepo.find();
  res.json(all);
};

export default { register, allUsers, login, registerAll };

/*Here it's only for registration purpose.*/
