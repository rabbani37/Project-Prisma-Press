import { prisma } from "../../lib/prisma";
import { ICommentCreatePayload, IUpdateCommentPayload } from "./comment.interface";



const createCommentFromDB = async (payload: ICommentCreatePayload, authorId: string) => {

    const comment = await prisma.comment.create({
        data: {
            ...payload,
            authorId
        }
    });
    return comment;

};;


const getCommentByAuthorIdFromDb = async (authorId: string) => {

    const comment = await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });

    return comment;
};;


const getCommentByCommentIdFromDB = async (commentId: string) => {
    const comment = await prisma.comment.findUniqueOrThrow({
        where: { id: commentId },
        include: { post: { select: { id: true, title: true, views: true } } }
    });

    return comment;
};;


const updateCommentByIdFromDB = async (payload: IUpdateCommentPayload, commentId: string, authorId: string) => {
    await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId
        },
        select: { id: true }
    });

    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId,
            authorId
        },
        data: {
            ...payload
        }
    });

    return updatedComment;

};;


const updateCommentByModerateFromDB = () => { };


const deleteCommentByIdFromDB = () => { };


export const commentService = {
    createCommentFromDB,
    getCommentByAuthorIdFromDb,
    getCommentByCommentIdFromDB,
    updateCommentByIdFromDB,
    updateCommentByModerateFromDB,
    deleteCommentByIdFromDB
}