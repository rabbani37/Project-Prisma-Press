import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";


export interface ICreatePostPayload {
    title: string;
    content: string;
    thumbnail?: string;
    isFetured?: boolean;
    status?: PostStatus;
    views?: number;
    tags: string[];
}

export interface IUpdatePostPayload {
    title?: string;
    content?: string;
    thumbnail?: string;
    isFetured?: boolean;
    status?: PostStatus;
    views?: number;
    tags?: string[];

}

export interface IPostQuary extends PostWhereInput {
    title: string;
    content: string;
    searchTarm: string;
    limit: string;
    page: string;
    sortBy: string;
    sortOrder: string;
}
