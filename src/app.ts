import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import AppDataSource from "./config/db_config";
import cors from "cors"

const app = express();
app.use(cors())
dotenv.config();
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 9091; //my process.env.PORT is not working

app.get("/", (req, res) => {
  res.send("Server working");
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(port, () => {
      console.log(`Listening to port ${port} successfully`);
    });
  })
  .catch((err) => console.error(err));
