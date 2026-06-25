import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcrypt"
import { userRoutes } from "./modules/user/user.route";

const app: Application = express();



// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes)



app.get("/", async (req: Request, res: Response) => {
    res.send({ message: "Hello World!" })
});




export default app; 