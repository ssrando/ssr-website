import { JSONValue } from 'vanilla-jsoneditor'

export type User = {
    username?: string;
    avatar?: string;
    id?: string;
    internalId: number;
    isAdmin: boolean;
}

export type DynamicData = {
    id: number;
    data: JSONValue;
}

export type DynamicDataType = {
    id: number;
    name: string;
}