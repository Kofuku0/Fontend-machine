'use client';
import React, { useEffect } from "react";
import Image from "next/image";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const LIMIT = 7;
let PAGE = 1;
const TOTAL_COUNT = 28;

const InfiniteScroll = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const { lastItemRef } = useInfiniteScroll({
    setPage,
    setHasMore,
    total_count: TOTAL_COUNT,
    dataLength: data.length,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`
      );
      const dataa = await res.json();
      setData((prev) => [...prev, ...dataa]);
    };
    fetchData();
  }, [page, LIMIT]);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-200 via-purple-200 to-blue-200 flex justify-center py-8">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-4xl shadow-xl px-4 py-6">

        {/* Header */}
        <h1 className="text-center text-2xl font-extrabold text-purple-700 mb-6 drop-shadow-sm">
          🌈 Infinite 
        </h1>

        {/* Scroll Container */}
        <div className="flex flex-col gap-6 items-center h-[70vh] overflow-auto scrollbar-hide">
          {data.map((item, ix) => {
            const isLastItem = ix === data.length - 1;

            return (
              <div
                key={ix}
                ref={isLastItem ? lastItemRef : null}
                className="data-item w-full rounded-3xl bg-white shadow-md border-4 border-purple-200 
                           p-3 transform transition-all duration-300 
                           hover:scale-[1.03] hover:rotate-1 hover:shadow-xl"
              >
                <Image
                  src={item.download_url}
                  alt={item.author}
                  width={300}
                  height={220}
                  className="rounded-2xl object-cover"
                />

                <p className="mt-2 text-center text-sm font-semibold text-purple-600">
                  🎨 {item.author}
                </p>
              </div>
            );
          })}

          {/* Footer / Loader */}
          <div className="py-4">
            {hasMore ? (
              <div className="flex items-center gap-2 text-purple-700 font-bold animate-bounce">
                🍭 Loading more magic...
              </div>
            ) : (
              <div className="text-pink-600 font-bold">
                🧁 No more cartoons left!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
