import CallRoom from "@/components/pages/appointments/call/room/CallRoom";
import { getSession } from "@/lib/session";

const page = async () => {
  const session = await getSession();
  return (
    <div>
      <CallRoom session={session} />
    </div>
  );
};

export default page;
