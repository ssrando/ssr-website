import { ServerActionResult } from "./ServerAction";

export const saveData = async (id: number, data: any ): Promise<ServerActionResult> => {
    console.log(JSON.stringify(data));
    const response = await fetch(`/api/dynamicdata/edit/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        return {
            success: false,
            error: `${response.status} - ${response.statusText}`
        }
    }
    return {
        success: true,
    }
}