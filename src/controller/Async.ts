import { ServerActionResult } from './ServerAction';

export const createAsync = async (
    name: string,
    permalink: string,
    hash: string,
    time?: string,
    comment?: string,
): Promise<ServerActionResult> => {
    const response = await fetch('/api/asyncs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            permalink,
            hash,
            time,
            comment,
        }),
    });

    if (!response.ok) {
        return {
            success: false,
            error: `${response.status} - ${response.statusText}`,
        };
    }
    return {
        success: true,
    };
};

export default {};
