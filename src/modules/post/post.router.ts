import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../user/user.middleware";
import { ROLE } from "../../../generated/prisma/enums";




const router = Router();

router.post("/", auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR), postController.createAPost);

router.get("/my-post", postController.getMyPost);
router.get("/start", auth(ROLE.ADMIN), postController.getPostStart);
router.get("/:postId", postController.getASinglePost);

router.patch("/:postId", auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR), postController.updatePost);

router.delete("/:postId", auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR), postController.deletePost)



export const postRouter = router;;