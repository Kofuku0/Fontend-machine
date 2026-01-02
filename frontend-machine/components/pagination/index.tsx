"use client";
import React, { useEffect, useMemo } from "react";
import Image from "next/image";

const LIMIT = 8;
const Index = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);

  const WINDOW_SIZE = 7;
  const PAGE_LIMIT = 50;

  const itemsBeforeAfter = 3;
  let startPoint = 2;
  let endPoint = startPoint + WINDOW_SIZE - 1;

  const mid = useMemo(() => Math.ceil((WINDOW_SIZE + 2) / 2), [WINDOW_SIZE]);

  if (page > mid) {
    startPoint = page - itemsBeforeAfter;
    endPoint = page + itemsBeforeAfter;
  }

  if (page > PAGE_LIMIT - itemsBeforeAfter - 1) {
    startPoint = PAGE_LIMIT - WINDOW_SIZE;
  }

  let arr: number[] = [];
  arr.push(1);
  for (let i = startPoint; i <= endPoint; i++) {
    if (i > 1 && i < PAGE_LIMIT) {
      arr.push(i);
    }
  }
  arr.push(PAGE_LIMIT);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`
        );
        const dataa = await res.json();
        setData(dataa);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (page < PAGE_LIMIT) setPage((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Image Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse beautiful images from{" "}
            <span className="font-semibold text-blue-600">Picsum Photos</span>. 
            Page {page} of {PAGE_LIMIT}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Image Grid */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((item, ix) => (
                <div
                  key={ix}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.download_url}
                      alt={item.author}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Author Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {item.author}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          Image ID: {item.id}
                        </p>
                      </div>
                      <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {item.width} × {item.height}
                      </span>
                    </div>
                  </div>
                  
                  {/* View Button */}
                  <button className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-gray-50">
                    View
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination - Enhanced UI */}
            <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <div className="flex flex-col items-center">
                {/* Page Info */}
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 font-medium">Page:</span>
                      <span className="text-2xl font-bold text-blue-600">{page}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-600">{PAGE_LIMIT}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <span className="text-gray-600">
                      Showing <span className="font-semibold">{data.length}</span> images
                    </span>
                  </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Prev Button */}
                  <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <svg className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="ml-2 font-medium text-gray-700">Prev</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {arr.map((item, ix) => (
                      <React.Fragment key={ix}>
                        {ix === 0 && arr[1] > 2 && (
                          <span className="px-3 py-2 text-gray-400">···</span>
                        )}
                        <button
                          onClick={() => setPage(item)}
                          className={`min-w-[52px] h-12 flex items-center justify-center rounded-xl font-medium transition-all duration-300 ${
                            item === page
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 hover:shadow-md"
                          }`}
                        >
                          {item}
                        </button>
                        {ix === arr.length - 2 && arr[arr.length - 2] < PAGE_LIMIT - 1 && (
                          <span className="px-3 py-2 text-gray-400">···</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    disabled={page === PAGE_LIMIT}
                    className="flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <span className="mr-2 font-medium text-gray-700">Next</span>
                    <svg className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Quick Navigation */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-gray-600 text-sm">Jump to:</span>
                  <div className="flex gap-2">
                    {[1, 10, 25, 50].map((num) => (
                      <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          page === num
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by Picsum Photos API • Images are randomly generated</p>
        </div>
      </div>
    </div>
  );
};

export default Index;