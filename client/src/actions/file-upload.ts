import { useMutationHandler } from "@/hooks/useMutationHandler";
import apiClient from "@/lib/apiClient";

export function FileUploadAction() {
  return useMutationHandler({
    mutationFn: (data) =>
      apiClient.post(`/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (res: any) => {
      console.log("File uploaded successfully:", res?.data?.url);
    },
    onError: (error) => {
      console.error("File upload failed:", error);
    },
  });
}
