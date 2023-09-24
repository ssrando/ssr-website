import { UserGuild } from '../ApiTypes';
import { ServerActionResult } from './ServerAction';

export const addServer = async (
    server: UserGuild,
): Promise<ServerActionResult> => {
    const response = await fetch(`/api/superuser/discord/servers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: server.id,
            name: server.name,
            icon: server.icon,
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

export const deleteServer = async (id: string): Promise<ServerActionResult> => {
    const response = await fetch(`/api/superuser/discord/servers/${id}`, {
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

export const setAdminRole = async (server: string, role: string) => {
    const response = await fetch(`/api/superuser/admins/roles/${server}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ server, role }),
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

export const clearAdminRole = async (server: string, role: string) => {
    const response = await fetch(`/api/superuser/admins/roles/${server}`, {
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

export default {};
