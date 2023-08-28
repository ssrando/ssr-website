import { ServerActionResult } from './ServerAction';

export const createRole = async (role: string): Promise<ServerActionResult> => {
    const response = await fetch(`/api/security`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
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

export const deleteRole = async (id: number): Promise<ServerActionResult> => {
    const response = await fetch(`/api/security/${id}`, {
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

export const updateDiscordRole = async (
    id: number,
    discordRole: string,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/security/${id}/changeDiscordRole`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discordRole }),
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

export const changeRoleEnabled = async (
    id: number,
    enabled: boolean,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/security/${id}/changeEnabled`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled }),
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

export const changePointEnabled = async (
    id: number,
    enabled: boolean,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/security/points/${id}/changeEnabled`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled }),
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
