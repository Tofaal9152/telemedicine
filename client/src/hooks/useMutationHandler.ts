import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMutationHandler<TData, TVariables>({
  mutationFn,
  queryKey,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
}: UseMutationHandlerOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      if (queryKey) queryClient.invalidateQueries({ queryKey });
      if (successMessage) {
        toast.success(successMessage);
      }
      if (onSuccess) onSuccess(data);
    },
    onError: (error: any) => {
      console.error("Mutation error:", error?.response?.data?.message || error);

      toast.error(
        errorMessage || error?.response?.data?.message || "An error occurred"
      );

      if (onError) onError(error);
    },
  });
}
type UseMutationHandlerOptions<TData, TVariables> = {
  mutationFn: (data: TVariables) => Promise<TData>;
  queryKey?: QueryKey;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};
