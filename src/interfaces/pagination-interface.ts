export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginationResult<T> {
  page: number
  pages: number
  count: number
  data: T[]
}
