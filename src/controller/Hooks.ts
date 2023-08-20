import useSWR from 'swr';

export const useGetApi = <T>(route: string) =>
    useSWR<T>(route, (path) => fetch(path).then((res) => res.json()));

export const useFileGet = (route: string) =>
    useSWR<string>(route, (path) => fetch(path).then((res) => res.text()));

export default {};
