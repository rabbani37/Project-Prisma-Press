import { prisma } from "../../lib/prisma";
import { ICommentCreatePayload, IModaratCommentPayload, IUpdateCommentPayload } from "./comment.interface";



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


const updateCommentByModerateFromDB = async (payload: IModaratCommentPayload, commentId: string) => {
    const comment = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId
        }
    });

    if (comment.status === payload.status) {
        throw new Error(`Your Provided status ${payload.status} already up to date.`)
    };

    const updateComment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            status: payload.status
        }
    });

    return updateComment
};;


const deleteCommentByIdFromDB = async (commentId: string) => {

    await prisma.comment.findUniqueOrThrow({
        where:{
            id:commentId
        }
    });


    await prisma.comment.delete({
        where:{
            id:commentId
        }
    })
};;


export const commentService = {
    createCommentFromDB,
    getCommentByAuthorIdFromDb,
    getCommentByCommentIdFromDB,
    updateCommentByIdFromDB,
    updateCommentByModerateFromDB,
    deleteCommentByIdFromDB
}