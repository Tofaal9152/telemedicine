import { features } from "@/constants/demoData";

const FeaturesSection = () => {
  return (
    <section className="py-20 AntonFont px-6 relative bg-gradient-to-br from-[#4f3d80] to-[#E6FFF5]">
      <div className="absolute inset-0 "></div>

      <div className="relative z-10 ">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl  font-bold mb-4 bg-gradient-to-r uppercase text-[#E6FFF5]">
            Designed for Real Progress
          </h2>
          <p className="text-xl text-gray-800  max-w-2xl mx-auto uppercase">
            Everything you need to become fluent, confident, and career-ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`rounded-3xl p-8 bg-[#4f3d80] backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300  transform hover:scale-105 hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#E6FFF5] uppercase">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-lg text-[#E6FFF5] leading-relaxed uppercase">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
