import jwt from "jsonwebtoken";
import { AuthReqInterface } from "../interfaces/AuthReqInterface";

const signJWT = (
  person: AuthReqInterface,
  callback: (error: Error | null, token: String | null) => void
): void => {
  let timeSinceEpoch = new Date().getTime();
  let expireTime = timeSinceEpoch + Number(3600) * 100000;
  let exporationTimeInSeconds = Math.floor(expireTime / 1000);
  console.log(`Inside signJWT`);

  try {
    jwt.sign(
      {
        username: person.username,
      },
      "superencryptedsecret",
      {
        issuer: "coolIssuer",
        algorithm: "HS256",
        expiresIn: exporationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (err) {
    console.log(`Having error in signJWT`);
  }
};

export default signJWT;
