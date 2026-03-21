// services/shared/types/pagination.ts

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function paginate<T>(items: T[], total: number, params: PaginationParams): PaginatedResult<T> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}
