import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface"

const createAPostFromDB = async (payload: ICreatePostPayload, userId: string) => {

    await prisma.post.create({
        data: {
            ...payload,
            authorId: userId,
        }
    });

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

    // await prisma.post.update({
    //     where: { id: postId },
    //     data: {
    //         views: {
    //             increment: 1
    //         }
    //     },
    // });

    // const post = await prisma.post.findUniqueOrThrow({
    //     where: {
    //         id: postId
    //     },
    //     include: {
    //         author: {
    //             omit: { password: true }
    //         },
    //         comments: {
    //             where: {
    //                 status: CommentStatus.APPROVED
    //             },
    //             orderBy: {
    //                 createdAt: "desc"
    //             },
    //         },
    //         _count: {
    //             select: { comments: true }
    //         }
    //     }
    // })
    // return post;

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            await tx.post.update({
                where: { id: postId },
                data: {
                    views: {
                        increment: 1
                    }
                }
            });

            // throw new Error("This is fake error")

            const post = await tx.post.findUniqueOrThrow({
                where: {
                    id: postId
                },
                include: {
                    author: {
                        omit: { password: true }
                    },
                    comments: {
                        where: {
                            status: "APPROVED"
                        },
                        orderBy: {
                            status: "desc"
                        }
                    },
                    _count: {
                        select: { comments: true }
                    }
                }

            });
            return post;
        }
    );
    return transactionResult

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



const updatePostFromDB = async (postId: string, payload: IUpdatePostPayload, authorId: string, isAdmin: true) => {

    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        },
    });

    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("You're not the owner of this post!")
    };

    const result = prisma.post.update({
        where: {
            id: postId
        },
        data: payload,
        include: {
            author: {
                omit: { password: true }
            },
            comments: true
        }
    });

    return result;

};;



const deletePostFromDB = async (postId: string, authorId: string, isAdmin: true) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        },
    });

    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("You're not the owner of this post!")
    };

    const result = await prisma.post.delete({
        where: {
            id: postId
        },
    });
    return result;
};;



const getPostStartFromDB = async () => {

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            const totalPost = await tx.post.count();

            const publishedPostTotal = await tx.post.count({
                where: { status: PostStatus.PUBLISHED }
            });
            const draftPostTotal = await tx.post.count({
                where: { status: PostStatus.DERFT }
            });
            const archivePostTotal = await tx.post.count({
                where: { status: PostStatus.ARCH }
            });



            const totalComments = await tx.comment.count();

            const totalPublishComment = await tx.comment.count({
                where: { status: CommentStatus.APPROVED }
            });
            const totalRejectComment = await tx.comment.count({
                where: { status: CommentStatus.REJECT }
            });

            // const totalPosts = await tx.post.findMany()
            // let totalPostsViews = 0
            // totalPosts.forEach(post => {
            //     totalPostsViews += post.views
            // })

            const postViews = await tx.post.aggregate({
                _sum: { views: true }
            })
            const totalPostsViews = postViews._sum.views
            return {
                totalPost,
                publishedPostTotal,
                draftPostTotal,
                archivePostTotal,

                totalComments,
                totalPublishComment,
                totalRejectComment,
                totalPostsViews
            }
        }
    );

    return transactionResult;

}


export const postService = {
    createAPostFromDB,
    getAllPostFromDB,
    getPostByIdFromDB,
    getMyPostFromDB,
    getPostStartFromDB,
    updatePostFromDB,
    deletePostFromDB
}