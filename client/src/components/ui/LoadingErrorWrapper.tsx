"use client";

import { Loader } from "lucide-react";
import React from "react";

type LoadingErrorWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
};

const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
  isLoading,
  isError,
  error,
  isEmpty = false,
  emptyMessage = "No results found.",
  children,
}) => {
  if (isLoading) {
    return <p className="text-center flex items-center justify-center text-white mt-4"><Loader className="animate-spin" /></p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-4">
        Error:{" "}
        {error instanceof Error ? error.message : "Something went wrong."}
      </p>
    );
  }

  if (isEmpty) {
    return <p className="text-center text-gray-500 mt-4">{emptyMessage}</p>;
  }

  return <>{children}</>;
};

export default LoadingErrorWrapper;
