"use client"

import { useInfiniteData } from "@/hooks/useInfiniteData"
import { InfiniteScroller } from "@/lib/InfiniteScroller"
import PaymentItem from "./PaymentItem"

const PaymentsContent = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteData<any>(`/appointments/patient/all`, ["patient-all-payments-records"])

  const payments = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-12 text-white border border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in">
        Payment Records
      </h1>

      <InfiniteScroller
        items={payments}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        renderItem={(item) => <PaymentItem key={item.id} item={item} />}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}

export default PaymentsContent
