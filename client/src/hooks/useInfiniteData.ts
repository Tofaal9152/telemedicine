import { getter } from "@/lib/request";
import { useInfiniteQuery } from "@tanstack/react-query";

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function useInfiniteData<T>(
  initialUrl: string,
  queryKey: string | readonly unknown[]
) {
  return useInfiniteQuery<PaginatedResponse<T>>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: ({ pageParam = initialUrl }) =>
      getter<PaginatedResponse<T>>(pageParam as string),
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    initialPageParam: initialUrl,
  });
}
