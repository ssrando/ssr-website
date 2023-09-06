import { ServerActionDataResult, ServerActionResult } from './ServerAction';

export const createFile = async (
    name: string,
    path: string,
    content?: string,
): Promise<ServerActionDataResult<number>> => {
    const response = await fetch(`/api/files/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content }),
    });

    if (!response.ok) {
        return {
            success: false,
            error: await response.text(),
        };
    }
    const { id } = await response.json();
    return {
        success: true,
        data: id,
    };
};

export const editFile = async (
    fileId: string,
    content: string,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/files/${fileId}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
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

export const deleteFile = async (
    fileId: string | number,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/files/${fileId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
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
