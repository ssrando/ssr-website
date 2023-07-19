import { JSONValue } from 'vanilla-jsoneditor';

export type User = {
    username?: string;
    displayName?: string;
    avatar?: string;
    id?: string;
    internalId: number;
    isAdmin: boolean;
};

export type DynamicData = {
    id: number;
    data: JSONValue;
};

export type DynamicDataTyped<T> = {
    id: number;
    data: T;
};

export type DynamicDataType = {
    id: number;
    name: string;
};

export type DisplayUser = {
    username: string;
    avatar: string;
    discordId: string;
};

export type AsyncSubmission = {
    id: number;
    user: DisplayUser;
    time: string;
    comment: string;
};

export type Async = {
    id: number;
    name: string;
    permalink: string;
    version: string;
    versionLink: string;
    hash: string;
    creator: DisplayUser;
    submissions: AsyncSubmission[];
};
