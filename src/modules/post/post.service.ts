import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IPostQuary, IUpdatePostPayload } from "./post.interface"
import { PostWhereInput } from "../../../generated/prisma/models";

const createAPostFromDB = async (payload: ICreatePostPayload, userId: string) => {

    const post = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId,
        }
    });
    return post;
};;



const getAllPostFromDB = async (query: IPostQuary) => {

    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;

    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc"



    const andCondition: PostWhereInput[] = [];


    if (query.searchTarm) {
        andCondition.push({
            OR: [
                {
                    title: {
                        contains: query.searchTarm,
                        mode: "insensitive"
                    }
                },
                {
                    content: {
                        contains: query.searchTarm,
                        mode: "insensitive"
                    }
                }
            ]
        })
    }



    if (query.title) {
        andCondition.push({
            title: query.title
        })
    };

    if (query.content) {
        andCondition.push({
            content: query.content
        })
    };

    if (query.authorId) {
        andCondition.push({
            authorId: query.authorId
        })
    };

    if (query.isFetured) {
        andCondition.push({
            isFetured: Boolean(query.isFetured)
        })
    };

    if (query.tags) {
        andCondition.push({
            tags: {
                hasSome: JSON.parse(query.tags as string)
            }
        })
    };

    if (query.status) {
        andCondition.push({
            status: query.status
        })
    };





    const allPosts = await prisma.post.findMany({
        /// Filtaring: without AND operator 

        // where:{
        //     title:"Complete CRUD with Prisma",
        //     content:"Build Create, Read, Update, and Delete operations using Prisma ORM."
        // },

        /// Filter : with AND operator
        // where: {
        //     AND: [
        //         { title: "Authentication with Passport.js" },
        //         { content: "Implement local and JWT authentication strategies using Passport.js in Express     applications." },
        //         {
        //             tags: {
        //                 hasEvery: ["prisma"]
        //             }
        //         }
        //     ]
        // },

        /// Search: 
        // where: {
        //     title: {
        //         contains: "Advanced",
        //         mode: "insensitive"
        //     },

        // },

        /// Searching : with OR operator

        // where: {
        //     OR:[
        //         {
        //             title:{
        //                 contains:"Advanced",
        //                 mode:"insensitive"
        //             }
        //         },
        //         {
        //             content:{
        //                 contains:"TypeScript",
        //                 mode:"insensitive"
        //             }
        //         }
        //     ]
        // },


        /// Combaining search and filtering 
        // where: {

        //     AND: [
        //         {
        //             OR: [
        //                 {
        //                     title: {
        //                         contains: 'Advanced',
        //                         mode: "insensitive"
        //                     }
        //                 },
        //                 {
        //                     content: {
        //                         contains: "TypeScript",
        //                         mode: "insensitive"
        //                     }
        //                 }
        //             ]
        //         },
        //         {
        //             title: "Advanced TypeScript Tips",
        //             content: "Improve your TypeScript skills with advanced concepts and best practices."
        //         }
        //     ]
        // },


        // take: 2,
        // skip: 0, // visiting : 1 page
        // skip: 1, // visiting : 2 page
        // skip: 2, // visiting : 3 page
        // skip: 3, // visiting : 4 page
        // skip: 4, // visiting : 4 page



        // Sorting in ascending or descending spacific fields.
        // orderBy: {
        //     createdAt: 'desc',
        //     title: "asc",
        //     content: "desc"
        // },


        // where: {
        //     AND: [
        //         query.searchTarm ? {
        //             OR: [
        //                 {
        //                     title: {
        //                         contains: query.searchTarm,
        //                         mode: "insensitive"
        //                     }
        //                 },
        //                 {
        //                     content: {
        //                         contains: query.searchTarm,
        //                         mode: "insensitive"
        //                     }
        //                 }
        //             ]
        //         } : {},


        //         // title filtering
        //         query.title ? { title: query.title } : {},
        //         query.content ? { content: query.content } : {}

        //     ]
        // },

        where: {
            AND: andCondition
        },

        take: limit,
        skip: skip,


        orderBy: {
            [sortBy]: sortOrder
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
            // const totalPost = await tx.post.count();

            // const publishedPostTotal = await tx.post.count({
            //     where: { status: PostStatus.PUBLISHED }
            // });
            // const draftPostTotal = await tx.post.count({
            //     where: { status: PostStatus.DERFT }
            // });
            // const archivePostTotal = await tx.post.count({
            //     where: { status: PostStatus.ARCH }
            // });



            // const totalComments = await tx.comment.count();

            // const totalPublishComment = await tx.comment.count({
            //     where: { status: CommentStatus.APPROVED }
            // });
            // const totalRejectComment = await tx.comment.count({
            //     where: { status: CommentStatus.REJECT }
            // });


            // const postViews = await tx.post.aggregate({
            //     _sum: { views: true }
            // })
            // const totalPostsViews = postViews._sum.views



            // -----------------

            const [
                totalPost,
                publishedPostTotal,
                draftPostTotal,
                archivePostTotal,
                totalComments,
                totalPublishComment,
                totalRejectComment,
                totalPostsViewsAggra
            ] = await Promise.all([
                await tx.post.count(),//totalpost
                await tx.post.count({
                    where: { status: PostStatus.PUBLISHED } // publishedPostTotal
                }),
                await tx.post.count({
                    where: { status: PostStatus.DERFT } // draftPostTotal
                }),
                await tx.post.count({
                    where: { status: PostStatus.ARCH } // archivePostTotal
                }),
                await tx.comment.count(), // totalComments
                await tx.comment.count({
                    where: { status: CommentStatus.APPROVED } // totalPublishComment
                }),
                await tx.comment.count({
                    where: { status: CommentStatus.REJECT } // totalRejectComment
                }),
                await tx.post.aggregate({
                    _sum: { views: true } // totalPostsViewsCount
                })
            ])





            return {
                totalPost,
                publishedPostTotal,
                draftPostTotal,
                archivePostTotal,
                totalComments,
                totalPublishComment,
                totalRejectComment,
                totalPostsViews: totalPostsViewsAggra._sum.views
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