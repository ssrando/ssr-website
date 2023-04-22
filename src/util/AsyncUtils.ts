import { Async, User } from "../ApiTypes";

export const hasSubmittedToAsync = (async: Async, user?: User) => {
    if (!user) {
        return false;
    }

    if (!user.id) {
        return false;
    }

    return async.submissions
        .map((submission) => submission.user.discordId)
        .includes(user.id);
};

export default {};
