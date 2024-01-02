import express, { Request, Response } from "express";
import cors from "cors"
import { UserRoutes } from "./routes/user.router";

const app = express()
app.use(express.json());
app.use(cors());

app.use("/user", UserRoutes())

app.listen(3333, () => {
    console.log("API is running")
})