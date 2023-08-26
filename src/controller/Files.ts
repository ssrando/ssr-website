import { ServerActionResult } from './ServerAction';

export const createFile = async (
    name: string,
    path: string,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/files/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
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
    fileId: string,
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
