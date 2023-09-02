export type ServerActionSuccess = {
    success: true;
};

export type ServerActionReturnData<T> = {
    success: true;
    data: T;
};

export type ServerActionError = {
    success: false;
    error: string;
};

export type ServerActionResult = ServerActionSuccess | ServerActionError;

export type ServerActionDataResult<T> =
    | ServerActionReturnData<T>
    | ServerActionError;
