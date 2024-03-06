import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import { UserRoutes } from "./routes/user.routes";
import { AuthRoutes } from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", UserRoutes());
app.use("/auth", AuthRoutes());

app.listen(3333, () => {
  console.log("API is running");
});
