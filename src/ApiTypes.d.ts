import { JSONValue } from 'vanilla-jsoneditor';

export type User = {
    username?: string;
    avatar?: string;
    id?: string;
    internalId: number;
    isAdmin: boolean;
};

export type DynamicData = {
    id: number;
    data: JSONValue;
};

export type DynamicDataType = {
    id: number;
    name: string;
};

export type AsyncSubmission = {
    id: number;
    user: string;
    time: string;
    comment: string;
}

export type Async = {
    id: number;
    name: string;
    permalink: string;
    hash: string;
    creator: string;
    submissions: AsyncSubmission[];
}