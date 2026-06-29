import { NextFunction, Request, Response } from "express";
import { catchAsync2 } from "../../../utility/trycatchAsync";
import { commentService } from "./comment.service";
import { sendRespose } from "../../../utility/sendResponce";
import httpstatus from "http-status"



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
    const comment = await commentService.getCommentByAuthorIdFromDb(authorId as string)

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Create Successfully",
        data: comment
    });
});

const getCommentByCommentId = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {


    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Create Successfully",
        data: "result"
    });
});

const updateCommentById = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {


    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Create Successfully",
        data: "result"
    });
});

const updateCommentByModerate = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {


    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Create Successfully",
        data: "result"
    });
});


const deleteCommentById = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {


    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Comment Create Successfully",
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