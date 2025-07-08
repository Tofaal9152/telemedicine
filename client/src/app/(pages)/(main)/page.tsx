import AppointmentSection from "@/components/pages/landing-page/hero-appointment/AppointmentSection";
import HeroSection from "@/components/pages/landing-page/HeroSection";
import { getSession } from "@/lib/session";

const HomePage = async () => {
  const session = await getSession();
  return (
    <main>
      <HeroSection role={session?.user.role} />
      <AppointmentSection role={session?.user.role} />
    </main>
  );
};

export default HomePage;
