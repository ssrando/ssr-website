import { useContext } from 'react';
import useSWR from 'swr';
import { UserContext } from '../contexts/UserContext';

export const useGlobalInterceptors = () => {
    const { fetch: originalFetch } = window;
    const { update } = useContext(UserContext);
    window.fetch = async (...args) => {
        const [resource, config] = args;
        const response = await originalFetch(resource, config);
        // global error handling
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // if we ever get a 401 or 403 but think we're still logged in, it
                // means one of two things has happened
                // 1. the client state and server state have gotten desynced.
                //    This can happen for a multitude of reasons, one of the
                //    most notable of which is a change in permissions on the
                //    server cache
                // 2. The session value is stale. Generally this will only
                //    happen if the server fails to correctly sync values
                //    across sessions when data is updated. This can also happen
                //    if there is a race condition where a request occurs during
                //    the update process
                if (update) {
                    update({ loggedIn: false, user: undefined });
                }
            }
        }
        return response;
    };
};

export const useGetApi = <T>(route: string, immutable?: boolean) => {
    const options = {
        revalidateIfStale: !immutable,
        revalidateOnFocus: !immutable,
        revalidateOnReconnect: !immutable,
    };
    return useSWR<T>(
        route,
        (path) =>
            fetch(path).then((res) => {
                if (!res.ok) {
                    if (res.status === 404) {
                        return undefined;
                    }
                }
                return res.json();
            }),
        options,
    );
};

export const useFileGet = (route: string) =>
    useSWR<string>(route, (path) =>
        fetch(path)
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 404) {
                        return undefined;
                    }
                }
                return res.text();
            })
            .catch((err) => err),
    );

export default {};
