import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Ami DU theke. 3 month por theke I started speaking in interviews without fear!",
    name: "Nusaiba",
    title: "DU Economics",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    quote: "Class gula onek fun chilo. Amar IELTS e 7.5 ashche speaking e!",
    name: "Rakin",
    title: "HSC Candidate",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    quote: "UP&PRO amake not just fluent, confident baniyeche.",
    name: "Tamim",
    title: "Private Uni Student",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-800 dark:via-blue-900/30 dark:to-indigo-900/30">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          What Students Say
        </h2>
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Join thousands of successful students
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative space-y-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className=" relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform  p-8 border border-white/20 "
          >
            <div
              className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${t.gradient} rounded-full flex items-center justify-center`}
            >
              <Quote className="w-6 h-6 text-white" />
            </div>

            <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
              &quot;{t.quote}&quot;
            </blockquote>

            <footer className="flex items-center gap-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${t.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg`}
              >
                {t.name[0]}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-gray-100">
                  {t.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t.title}
                </div>
              </div>
            </footer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
