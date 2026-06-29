import { prisma } from "../../lib/prisma";
import { ICommentCreatePayload } from "./comment.interface";



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
        include: {
            author: {
                omit: { password: true }
            }
        }
    });

    return comment;
};;


const getCommentByCommentIdFromDB = () => { }


const updateCommentByIdFromDB = () => { };


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