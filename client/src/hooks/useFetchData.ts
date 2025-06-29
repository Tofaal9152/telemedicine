import { getter } from "@/lib/request";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useFetchData<T>(
  url: string,
  queryKey: string | readonly unknown[]
): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => getter<T>(url),
  });
}
