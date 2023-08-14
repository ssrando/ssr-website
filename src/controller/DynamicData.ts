import { ServerActionResult } from './ServerAction';
import { ShapeElement } from '../components/DynamicDataFields';

export const saveData = async (
    id: number,
    data: Record<string, unknown>,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/dynamicdata/edit/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
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

export const newType = async (
    name: string,
    shape: ShapeElement[],
): Promise<ServerActionResult> => {
    const response = await fetch('/api/dynamicdata/types', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, shape }),
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

export const deleteType = async (name: string): Promise<ServerActionResult> => {
    const response = await fetch(`/api/dynamicdata/types/${name}`, {
        method: 'DELETE',
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

export const newData = async (
    type: string | undefined,
    content: Record<string, unknown>,
): Promise<ServerActionResult> => {
    if (!type) {
        return {
            success: false,
            error: 'No type specified - invalid route configuration',
        };
    }
    const response = await fetch(`/api/dynamicdata/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: content }),
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

export const deleteData = async (id: number): Promise<ServerActionResult> => {
    const response = await fetch(`/api/dynamicdata/${id}`, {
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
