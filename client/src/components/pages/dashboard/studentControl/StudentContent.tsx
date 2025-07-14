"use client";

import { useInfiniteData } from "@/hooks/useInfiniteData";

import { InfiniteScroller } from "@/lib/InfiniteScroller";
import PatientItem from "./StudentItem";
const patientContent = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteData<any>("/admin/patients", "admin-all-patients");

  const patients = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="dark:bg-gray-950 bg-white p-4 rounded-lg shadow-sm border">
      <InfiniteScroller
        items={patients}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        renderItem={(item) => <PatientItem key={item.id} item={item} />}
      />
    </div>
  );
};

export default patientContent;
