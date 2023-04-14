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

export const deleteAsync = async (
    id: number,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/asyncs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
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

export const createSubmission = async (
    async: number,
    time: string,
    comment: string
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/asyncs/${async}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            time, comment
        })
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

export const deleteSubmission = async (
    id: number,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/asyncs/submissions/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
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
