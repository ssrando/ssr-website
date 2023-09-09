import { User } from '../ApiTypes';

export const contentGrant = 'Manage Content Pages';
export const dataGrant = 'Manage Dynamic Data';
export const asyncGrant = 'Manage Asyncs';

export const hasGrant = (user: User, grant: string) => {
    if (user.isAdmin) return true;
    return user.grants.includes(grant);
};
