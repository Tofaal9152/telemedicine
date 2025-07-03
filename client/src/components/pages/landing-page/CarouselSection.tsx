import imagePath from "@/constants/imagePath";
import Image from "next/image";
const CaroselSection = () => {
  return (
    <div className=" shadow-[#4f3d80] p-0   max-w-[42rem] max-h-[400px] overflow-hidden rounded-lg shadow-lg">
      <Image
        src={imagePath.heroImage}
        alt={`Carousel-image`}
        width={800}
        height={400}
        className="w-full h-auto max-h-[400px] object-cover rounded-lg "
      />
    </div>
  );
};

export default CaroselSection;
// "use client";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import imagePath from "@/constants/imagePath";
// import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// const CaroselSection = () => {
//   const images = [
//     imagePath.heroImage,
//     imagePath.heroImage,
//     imagePath.heroImage,
//   ];
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [api, setApi] = useState<any>(null);

//   // Update active index when carousel changes
//   useEffect(() => {
//     if (!api) return;
//     const onSelect = () => {
//       setSelectedIndex(api.selectedScrollSnap());
//     };
//     api.on("select", onSelect);
//     onSelect(); // Initialize
//     return () => api.off("select", onSelect);
//   }, [api]);

//   return (
//     <div className="shadow-xl shadow-indigo-500/50 p-4 rounded-lg bg-white dark:bg-indigo-800">
//       <Carousel
//         plugins={[
//           Autoplay({
//             delay: 2000,
//           }),
//         ]}
//         setApi={setApi}
//         className="max-w-[42rem] max-h-[400px] overflow-hidden rounded-lg shadow-lg"
//       >
//         <CarouselContent>
//           {images.map((img, index) => (
//             <CarouselItem key={index}>
//               <Image
//                 src={img || "https://placehold.co/1920x1080.png"}
//                 alt={`Carousel-image-${index}`}
//                 width={800}
//                 height={400}
//                 className="w-full h-auto max-h-[400px] object-cover rounded-lg"
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//       {/* Dot Indicators */}
//       <div className="flex items-center justify-center mx-auto gap-2 mt-2">
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all duration-300 ${
//               index === selectedIndex
//                 ? "bg-indigo-600 scale-125"
//                 : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CaroselSection;
