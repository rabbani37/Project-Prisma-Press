import { Router } from "express";
import { postController } from "./post.controller";




const router = Router();

router.post("/",postController.createAPost);

router.get("/my-post", postController.getMyPost);
router.get("/:postId", postController.getASinglePost);
router.get("/start", postController.getPostStart);

router.patch("/:postId", postController.updatePost);

router.delete("/:postId", postController.deletePost)



export const postRouter = router;;