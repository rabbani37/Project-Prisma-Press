import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.router";
import { postRouter } from "./modules/post/post.router";
import { commentRouter } from "./modules/comment/comment.router";

const app: Application = express();



// middleware
app.use(cors({
    origin: config.app_url,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRouter)



app.get("/", async (req: Request, res: Response) => {
    res.send({ message: "Hello World!" })
});




export default app; 