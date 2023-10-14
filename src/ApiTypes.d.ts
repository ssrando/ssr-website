import { ShapeElement } from './components/DynamicDataFields';

export type User = {
    username?: string;
    displayName?: string;
    avatar?: string;
    id?: string;
    internalId: number;
    isAdmin: boolean;
    grants: string[];
    isSuperuser: boolean;
};

export type DynamicData = {
    id: number;
    data: Record<string, unknown>;
};

export type DynamicDataTyped<T> = {
    id: number;
    data: T;
};

export type DynamicDataList = {
    data: DynamicData[];
    shape: ShapeElement[];
};

export type DynamicDataType = {
    id: number;
    name: string;
    shape: string;
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

export type DiscordRole = {
    id: string;
    name: string;
    color: number;
};

export type File = {
    id: number;
    name: string;
    path: string;
};

export type SecurityPoint = {
    id: number;
    permission: string;
    enabled: boolean;
};

export type SecurityRole = {
    id: number;
    role: DiscordRole;
    enabled: boolean;
    points: SecurityPoint[];
};

export type DiscordConnection = {
    id: string;
    name: string;
    icon: string;
    botConnected: boolean;
    enabled: boolean;
    adminRole?: DiscordRole;
};

export type UserGuild = {
    id: string;
    name: string;
    icon: string;
};

export type DiscordRoleWithGuild = {
    id: string;
    name: string;
    color: number;
    guildId: string;
    guildIcon: string;
    guildName: string;
};
