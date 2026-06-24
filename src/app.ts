import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcrypt"

const app: Application = express();



// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.get("/", async (req: Request, res: Response) => {
    res.send({ message: "Hello World!" })
});



app.post("/api/users/register", async (req: Request, res: Response) => {
    const { name, email, password, profile_photo } = req.body;
    const isExsistUser = await prisma.user.findUnique({
        where: { email }
    });
    if (isExsistUser) {
        throw Error("User with this email already exgist")
    }

    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    });
    await prisma.profile.create({
        data: {
            user_id: createUser.id,
            profile_photo
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: createUser.id,
            email: createUser.email || email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    });



    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Register Successfully",
        data: { user }
    })
})

export default app;