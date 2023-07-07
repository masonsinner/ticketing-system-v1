type APIResponse<T> = {
    error: string | undefined;
    data: T
}

export default APIResponse