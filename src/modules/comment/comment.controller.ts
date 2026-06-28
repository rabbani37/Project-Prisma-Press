import { NextFunction, Request, Response } from "express";
import { catchAsync2 } from "../../../utility/trycatchAsync";



const createComment = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});

const getCommentByAuthorId = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});

const getCommentByCommentId = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});

const updateCommentById = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});

const updateCommentByModerate = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});

const deleteCommentById = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});





export const commentController = {
    createComment,
    getCommentByAuthorId,
    getCommentByCommentId,
    updateCommentById,
    updateCommentByModerate,
    deleteCommentById
}