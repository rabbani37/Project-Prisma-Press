import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"

const createAPostFromDB = async (payload: ICreatePostPayload, userId: string) => {

    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId,
        }
    });
    return result
};;



const getAllPostFromDB = async () => {
    const allPosts = await prisma.post.findMany({
        include: {
            author: {
                omit: { password: true }
            }
        }
    });

    return allPosts
};;



const getPostByIdFromDB = async (postId: string) => {
    
    console.log("GET POST BY ID FROM DB");

    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    });
    

    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
            views: {
                increment: 1
            }
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    });
    return updatedPost;
};;




const getMyPostFromDB = async (authorId: string) => {

    const result = await prisma.post.findMany({
        where: {
            authorId: authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            comments: true,
            author: {
                omit: {
                    password: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }
        }
    });
    return result;
};;






const getPostStartFromDB = () => { }


export const postService = {
    createAPostFromDB,
    getAllPostFromDB,
    getPostByIdFromDB,
    getMyPostFromDB,
    getPostStartFromDB
}