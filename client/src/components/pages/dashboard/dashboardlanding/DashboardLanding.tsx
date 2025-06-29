"use client";

import useClientFetch from "@/hooks/useClientFetch";
import StatsGrid from "./StatsGrid";
import ChartSection from "./ChartSection";
import DashboardSkeleton from "@/components/layout/Skeleton/DashboardSkeleton";
import StudentInfo from "./StudentInfo";

const DashboardLanding = ({ role }: any) => {
  const { data, loading } = useClientFetch<any>(
    role === "ADMIN" ? "/administrator/dashboard/" : "/student/dashboard/"
  );

  if (loading) return <DashboardSkeleton />;
  const stats = data?.data;

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 ">
      {role === "STUDENT" && <StudentInfo />}
      <div className="flex flex-col-reverse md:flex-col gap-5 ">
        <StatsGrid stats={stats} role={role} />
        <ChartSection stats={stats} role={role} />
      </div>
    </div>
  );
};

export default DashboardLanding;
