import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../user/user.middleware";
import { ROLE } from "../../../generated/prisma/enums";




const router = Router();

router.post("/",auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR),commentController.createComment);

router.get("/author/:authorId",commentController.getCommentByAuthorId);
router.get("/:commentId",commentController.getCommentByCommentId);

router.patch("/:commentId",auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR),commentController.updateCommentById);
router.put("/:commentId/moderate",auth(ROLE.ADMIN),commentController.updateCommentByModerate);

router.delete(":commentId",auth(ROLE.USER, ROLE.ADMIN, ROLE.AUTHOR), commentController.deleteCommentById)


export const commentRouter = router;;