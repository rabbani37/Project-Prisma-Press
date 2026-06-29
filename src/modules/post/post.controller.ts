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


const updatePost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const authorId = req.user?.id;
    const postId = req.params.postId;

    if (!postId) {
        throw new Error("post id required")
    }

    const payload = req.body;
    const isAdmin = req.user?.role === "ADMIN";


    const result = await postService.updatePostFromDB(postId as string, payload, authorId as string, isAdmin as true);
    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Successfully Updated You Posts",
        data: result
    });

});;


const deletePost = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const postId = req.params.postId;

    const isAdmin = req.user?.role === "ADMIN";

    await postService.deletePostFromDB(postId as string, authorId as string, isAdmin as true);
    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Successfully Deleted You Posts",
        data: null
    });

});




const getPostStart = catchAsync2(async (req: Request, res: Response, next: NextFunction) => {

    const result = await postService.getPostStartFromDB()

    sendRespose(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Successfully Get You Posts Start",
        data: result
    });

});;




export const postController = {
    createAPost,
    getAllPost,
    getPostById,
    getMyPost,
    getPostStart,
    updatePost,
    deletePost

}
