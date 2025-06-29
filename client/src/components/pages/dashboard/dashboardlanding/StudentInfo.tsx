"use client";

import { Badge } from "@/components/ui/badge";
import useClientFetch from "@/hooks/useClientFetch";

const StudentInfo = () => {
  const { data } = useClientFetch<any>("/student/profile/");

  return (
    <Badge className="w-full mb-4 bg-blue-500 text-white text-lg font-semibold p-4 dark:bg-gray-950 transition-shadow shadow-xl shadow-violet-500/20 hover:shadow-2xl dark:text-violet-500">
      Registration No: {data?.registration_number || "xxx-xxxx-xxxx"}
    </Badge>
  );
};

export default StudentInfo;
