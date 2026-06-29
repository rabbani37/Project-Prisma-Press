import { NextFunction, Request, Response } from "express";
import { catchAsync2 } from "../../../utility/trycatchAsync";
import { postService } from "./post.service";
import { sendRespose } from "../../../utility/sendResponce";
import httpstatus from "http-status"


const createAPost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.user?.id;
    const payload = req.body
    const post = await postService.createAPostFromDB(payload, id as string);

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.CREATED,
        message: "Successfully created a post",
        data: post
    })
});;


const getAllPost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const result = await postService.getAllPostFromDB();
    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Successfully Get app posts",
        data: result
    });
});;


const getPostById = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const postId = req.params.postId;
    if (!postId) {
        throw new Error("post id required")
    }
    const result = await postService.getPostByIdFromDB(postId as string);

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Successfully Get Single post",
        data: result
    });
});;



const getMyPost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const authorId = req.user?.id
    const result = await postService.getMyPostFromDB(authorId as string);

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Successfully Get Own posts",
        data: result
    });
});;


const getPostStart = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {
console.log("abcabcabcabc");
});;

const updatePost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});;


const deletePost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

});



export const postController = {
    createAPost,
    getAllPost,
    getPostById,
    getMyPost,
    getPostStart,
    updatePost,
    deletePost

}
