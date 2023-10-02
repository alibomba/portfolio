type PaginationResponse<T> = {
    currentPage: number,
    lastPage: number,
    data: T[]
}