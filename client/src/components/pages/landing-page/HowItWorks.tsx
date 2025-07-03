import { steps } from "@/constants/demoData";

const HowItWorks = () => {
  return (
    <section className="py-20 AntonFont px-6 bg-gradient-to-br from-[#4f3d80] to-[#E6FFF5]">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#E6FFF5] ">
          How It Works
        </h2>
        <p className="text-xl text-gray-800  max-w-2xl mx-auto">
          Your journey to fluency in 5 simple steps
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-6 group ">
              <div
                className={`flex-shrink-0 md:w-16  md:h-16 w-8 h-8 flex items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}
              >
                {index + 1}
              </div>
              <div className="flex-1 bg-[#4f3d80]  backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <p className="text-xl text-[#E6FFF5] leading-relaxed font-medium">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
