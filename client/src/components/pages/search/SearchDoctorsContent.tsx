"use client"

import { useInfiniteData } from "@/hooks/useInfiniteData"
import { InfiniteScroller } from "@/lib/InfiniteScroller"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import SearchDoctorItem from "./SearchDoctorItem"
import Searchbar from "./Searchbar"

const SearchDoctorsContent = () => {
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 500)

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteData<any>(
    `/public/doctors/approved?query=${debouncedQuery}`,
    ["search-all-doctors", debouncedQuery]
  )

  const doctors = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 text-white border border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-3xl">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in">
        Find a Doctor
      </h1>

      <div className="mb-6">
        <Searchbar setQuery={setQuery} query={query} />
      </div>

      <InfiniteScroller
        items={doctors}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        renderItem={(item) => <SearchDoctorItem key={item.id} item={item} />}
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
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}

export default SearchDoctorsContent
