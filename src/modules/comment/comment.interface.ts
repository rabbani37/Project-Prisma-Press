import { CommentStatus } from "../../../generated/prisma/enums";


export interface ICommentCreatePayload {
    content: string;
    postId: string;
}
export interface IUpdateCommentPayload {
    content?: string;
    status?: CommentStatus;
}

