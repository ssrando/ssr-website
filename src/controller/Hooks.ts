import useSWR from 'swr';

export const useGetApi = <T>(route: string) => {
    return useSWR<T>(route, (route) => fetch(route).then((res) => res.json()));
};
