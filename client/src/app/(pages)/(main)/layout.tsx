import Navbar from "@/components/layout/Navbar/Navbar";
import MainLayoutCom from "./MainLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007b8f] via-[#00a085] to-[#00c49a] text-white relative overflow-hidden">
      <Navbar />
      <MainLayoutCom>{children}</MainLayoutCom>
    </div>
  );
}
