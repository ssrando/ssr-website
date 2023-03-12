import { createContext, useState } from "react";

interface UserContextInterface {
    loggedIn: boolean;
    user?: {
        username?: string;
        avatar?: string;
        id?: string;
        internalId: number;
    };
}

export const initialUserContext: UserContextInterface = {
    loggedIn: false,
    user: undefined,
};

type UpdateType = React.Dispatch<
    React.SetStateAction<UserContextInterface>
>;
const defaultUpdate: UpdateType = () => initialUserContext;

export const UserContext = createContext({
    state: initialUserContext,
    update: defaultUpdate,
});

export const UserContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [state, update] = useState(initialUserContext);
    // this disable is necessary to allow this to render correctly
    // eslint-disable-next-line
    return <UserContext.Provider value={{ state, update }} {...props} />;
}