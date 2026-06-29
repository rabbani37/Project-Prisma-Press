import { PostStatus } from "../../../generated/prisma/enums";


export interface ICreatePostPayload {
    title: string;
    content: string;
    thumbnail?: string;
    isFetured?: boolean;
    status?: PostStatus;
    views?:number;
    tags: string[];
}