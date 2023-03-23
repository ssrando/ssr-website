export type ServerActionResult = ServerActionSuccess | ServerActionError; 

export type ServerActionSuccess = {
    success: true
}

export type ServerActionError = {
    success: false,
    error: string;
}