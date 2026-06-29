import { NextFunction, Request, Response } from "express";
import { catchAsync2 } from "../../../utility/trycatchAsync";
import { commentService } from "./comment.service";
import { sendRespose } from "../../../utility/sendResponce";
import httpstatus from "http-status"
import { constants } from "node:buffer";
import { auth } from "../user/user.middleware";
import { snapshot } from "node:test";



const createComment = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const payload = req.body;

    const comment = await commentService.createCommentFromDB(payload, authorId as string)
    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Create Successfully",
        data: comment
    });

});

const getCommentByAuthorId = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;
    const comments = await commentService.getCommentByAuthorIdFromDb(authorId as string)

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Successfully retrive your owns comments",
        data: comments
    });
});

const getCommentByCommentId = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const commentId = req.params.commentId;
    const comment = await commentService.getCommentByCommentIdFromDB(commentId as string)

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Get a single comment successfully ",
        data: comment
    });
});

const updateCommentById = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const authorId = req.user?.id;
    const commentId = req.params.commentId;
    const payload = req.body;

    const updatedComment = await commentService.updateCommentByIdFromDB(payload, commentId as string, authorId as string)

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Updated Successfully",
        data: updatedComment
    });
});

const updateCommentByModerate = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const commentId = req.params.commentId;
    const data = req.body;
    const updatePost = await commentService.updateCommentByModerateFromDB(data, commentId as string)

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Updated Successfully By Modarator ",
        data: updatePost
    });
});


const deleteCommentById = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {


    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Delete Successfully  ",
        data: "result"
    });
});





export const commentController = {
    createComment,
    getCommentByAuthorId,
    getCommentByCommentId,
    updateCommentById,
    updateCommentByModerate,
    deleteCommentById
}