import useSWR from 'swr';

export const useGetApi = <T>(route: string) =>
    useSWR<T>(route, (path) =>
        fetch(path).then((res) => {
            if (!res.ok) {
                if (res.status === 404) {
                    return undefined;
                }
            }
            return res.json();
        }),
    );

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
