import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { ROLE } from "../../../generated/prisma/enums";




const router = Router();

router.post("/", auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR), postController.createAPost);
router.get("/",postController.getAllPost)

router.get("/my-posts", auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR), postController.getMyPost);
router.get("/start", auth(ROLE.ADMIN), postController.getPostStart);

router.get("/:postId", postController.getPostById);
router.patch("/:postId", auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR), postController.updatePost);
router.delete("/:postId", auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR), postController.deletePost)




export const postRouter = router;;