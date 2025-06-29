"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

interface DeleteButtonProps {
  id: string;
  resourceUrl: string; 
  queryKey: string | string[];
  confirmMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

const DeleteButton = ({
  id,
  resourceUrl,
  queryKey,
  errorMessage = "Delete failed",
  successMessage = "Deleted successfully",
  confirmMessage = "Are you sure you want to delete this item?",
}: DeleteButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => apiClient.delete(`${resourceUrl}?id=${id}`),
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
      });
    },
    onError: (err: any) => {
      toast.error(err?.message || errorMessage);
    },
  });

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          mutate();
        }
      }}
    >
      <Trash2Icon className="w-4 h-4 mr-1" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
