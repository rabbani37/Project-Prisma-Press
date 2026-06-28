import { Router } from "express";
import { commentController } from "./comment.controller";




const router = Router();

router.post("/",commentController.createComment);

router.get("/author/:authorId",commentController.getCommentByAuthorId);
router.get("/:commentId",commentController.getCommentByCommentId);

router.patch("/:commentId",commentController.updateCommentById);
router.patch("/:commentId/moderate",commentController.updateCommentByModerate);

router.delete(":commentId", commentController.deleteCommentById)


export const commentRouter = router;;