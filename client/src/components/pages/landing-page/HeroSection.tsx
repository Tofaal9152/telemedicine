"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightCircle, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import imagePath from "@/constants/imagePath";

const HeroSection = () => {
  return (
    <section className="relative AntonFont min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imagePath.heroImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6FFF5]/60 to-[#4f3d80]/80 backdrop-brightness-75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center xl:text-left flex flex-col xl:flex-row items-center justify-evenly gap-12 ">
        {/* Left Content */}
        <div className="flex flex-col items-center xl:items-start">
          <div className="flex items-center justify-center xl:justify-start mb-6 space-x-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#4f3d80] to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <Star className="w-4 h-4" />
              <span className="">3 Months to Fluency</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-[#4f3d80] to-[#4f3d80] bg-clip-text text-transparent leading-tight ">
            Speak English Fluently in Just 3 Months
          </h1>

          <p className="text-xl md:text-2xl max-w-2xl mb-10 text-white leading-relaxed ">
            Daily practice. Weekly live classes. Career workshops.
            <br /> All for just{" "}
            <span className="font-bold text-2xl text-[#E6FFF5] ">
              300 BDT/Month
            </span>
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <Button
              size="lg"
              className="bg-[#4f3d80] hover:bg-[#3e2f6b] text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg AntonFont"
            >
              Join Now <ArrowRightCircle className="w-6 h-6 ml-2" />
            </Button>
            <Button
              variant="default"
              size="lg"
              className="bg-white text-[#4f3d80] AntonFont  hover:bg-[#E6FFF5] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
            >
              See How It Works
            </Button>
          </div>
        </div>
      {/* mobile image */}
      <div >
        <Image
          src={imagePath.appImage}
          alt="Hero Background"
          width={400}
          height={400}
          className="object-cover rounded-lg"
        />
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
