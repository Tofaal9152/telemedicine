import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

const benefits = [
  "No extra books or courses needed",
  "Cheaper than 1 burger/month",
  "Practice every single day, not just once a week",
]

const PricingSection = () => {
  return (
    <section className="py-20 AntonFont px-4 bg-gradient-to-br from-[#4f3d80] to-[#E6FFF5] ">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg mb-6">
            <Zap className="w-5 h-5" />
            <span>Limited Time Offer</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#E6FFF5]">
            Why 300 Taka Is a No-Brainer
          </h2>
        </div>

        <div className="bg-white/80  backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              ৳300
            </div>
            <div className="text-xl text-gray-600 ">per month</div>
          </div>

          <ul className="space-y-4 text-left max-w-md mx-auto mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-lg">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 ">{benefit}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300  text-xl"
          >
            Join Now & Get First Week Free!
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
