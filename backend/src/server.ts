import express, { Express, Request, Response } from "express";
import apiRouter from "./api/route";
import dotenv from "dotenv";
import { errorHandler } from "./middleware";
const cors = require("cors");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api", apiRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
