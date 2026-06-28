import { NextFunction, Request, Response } from "express";
import { catchAsync2 } from "../../../utility/trycatchAsync";

const createAPost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});


const getMyPost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});

const getASinglePost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});

const getPostStart = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});

const updatePost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});


const deletePost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});



export const postController = {
    createAPost,
    getMyPost,
    getASinglePost,
    getPostStart,
    updatePost,
    deletePost

}
