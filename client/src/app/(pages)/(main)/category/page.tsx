import imagePath from "@/constants/imagePath";
import { BookOpenCheck, Megaphone, Sparkles } from "lucide-react";
import Image from "next/image";

const Page = () => {
  return (
    <section className="min-h-screen AntonFont py-20 px-6  bg-gradient-to-br from-[#E6FFF5] to-[#4f3d80]">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Top Section — Title & Intro */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-full text-lg font-semibold shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>Write. Reflect. Inspire.</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-[#4f3d80] bg-clip-text text-transparent">
            UP&WRITE
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed flex items-center justify-center gap-2">
          
            <span>Powered by words. Inspired by learners.</span>
          </p>

          <p className="text-md text-[#E6FFF5] max-w-2xl mx-auto">
            UP&WRITE is the creative corner of UP&PRO — a space where students turn thoughts into text and ideas into impact. From articles to opinions, fiction to reflections, here your words don’t just sit — they speak.
          </p>
        </div>

        {/* Feature Image */}
        <div className="mt-4">
          <Image
            src={imagePath.categoryImage}
            alt="UP&WRITE Feature"
            width={600}
            height={550}
            className="rounded-3xl shadow-2xl mx-auto"
          />
        </div>

        {/* Bottom Text — CTA or More Info */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <p className="text-md md:text-lg text-gray-900  flex justify-center items-center gap-2">
            <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-300" />
            Share your story. Shape your voice. Let your writing grow with you.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold flex justify-center items-center gap-2">
            <BookOpenCheck className="w-6 h-6 text-emerald-600" />
            Monthly Writing Challenges Coming Soon!
          </h2>

          <p className="text-gray-800">
            Submit your writing and get featured. Let your words impact the community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
