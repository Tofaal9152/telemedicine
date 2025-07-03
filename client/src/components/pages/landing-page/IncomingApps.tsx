import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

const IncomingApps = () => {
  return (
    <section className="py-20 AntonFont px-4 bg-gradient-to-br from-[#4f3d80] to-[#E6FFF5]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Mobile Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/appDemo.png"
            alt="App Demo"
            width={256}
            height={460}
            className="rounded-xl shadow-md mix-bl-m"
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-[#E6FFF5] px-6 py-2 rounded-full text-md font-semibold shadow-lg mb-4">
            <span>Coming Soon</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#E6FFF5]">
            English Learning App Is On Its Way!
          </h2>

          <p className="text-lg text-gray-800 mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
            Soon, you&apos;ll be able to learn anytime, anywhere — from daily
            practice to live classes — all in the palm of your hand.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IncomingApps;
