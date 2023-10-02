export default interface PaginationResponse<T>{
    currentPage: number;
    lastPage: number;
    data: T[]
}
