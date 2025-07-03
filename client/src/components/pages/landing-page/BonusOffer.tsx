import { Flame, Gift, Clock } from "lucide-react"

const BonusOffer = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <Flame className="w-6 h-6 animate-bounce" />
            <span className="text-xl font-bold">June Special</span>
            <Gift className="w-6 h-6" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">🎉 Limited Time Bonus Offer! 🎉</h2>

        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 mb-6">
          <p className="text-xl md:text-2xl leading-relaxed mb-4">
            Enroll now and get access to our{" "}
            <strong className="text-yellow-300">CV Building + Job Interview Workshop</strong>
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span className="line-through text-white/70">Worth ৳500</span>
            <span className="text-2xl font-bold text-yellow-300">FREE!</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-lg">
          <Clock className="w-5 h-5" />
          <span>Offer expires soon - Don&apos;t miss out!</span>
        </div>
      </div>
    </section>
  )
}

export default BonusOffer
