import DashboardLanding from "@/components/pages/dashboard/dashboardlanding/DashboardLanding";
import { getSession } from "@/lib/session";

const page =async () => {
  const session = await getSession()
  return (
    <div>
      <DashboardLanding role={session?.user?.role}/>
    </div>
  );
};

export default page;
