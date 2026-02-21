import React, { useState, useEffect, useRef, useCallback } from 'react'

const API_CONSTANTS = {
  BASE_URL: 'https://jsonplaceholder.typicode.com/posts',
  LIMIT: 15,
}

const ChatBox = () => {
  const [page, setPage] = useState(1)
  const [allData, setAllData] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)

  // Use a ref for loading to avoid stale closures inside the IntersectionObserver
  const loadingRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const topSentinelRef = useRef<HTMLDivElement>(null)

  
  const prevScrollHeightRef = useRef(0)
  const isInitialLoad = useRef(true)

  const fetchData = useCallback(async (pageNum: number) => {
    if (loadingRef.current) return
    loadingRef.current = true

    try {
      const res = await fetch(
        `${API_CONSTANTS.BASE_URL}?_limit=${API_CONSTANTS.LIMIT}&_page=${pageNum}`
      )
      const newData = await res.json()

      // No more data from the API
      if (!newData || newData.length === 0) {
        setHasMore(false)
        return
      }

      // Snapshot scrollHeight before React re-renders and prepends items
      if (containerRef.current) {
        prevScrollHeightRef.current = containerRef.current.scrollHeight
      }

      // Prepend: older messages go to the top (like WhatsApp / Telegram)
      setAllData(prev => [...newData, ...prev])

      // If the API returned fewer items than requested, we've hit the end
      if (newData.length < API_CONSTANTS.LIMIT) {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      loadingRef.current = false
    }
  }, [])

  // ── Initial fetch ──────────────────────────────────────────────────────────
  useEffect(() => {
    fetchData(1)
  }, [fetchData])

  // ── After data updates: restore scroll position or jump to bottom ──────────
  useEffect(() => {
    if (!containerRef.current || allData.length === 0) return
    
    if (isInitialLoad.current) {
      // First load → scroll to the bottom so user sees latest messages
      containerRef.current.scrollTop = containerRef.current.scrollHeight
      isInitialLoad.current = false
    } else {
      // Subsequent loads → keep the user at the same visual position
      // by offsetting the scroll by however much height was added at the top
      const newScrollHeight = containerRef.current.scrollHeight
      containerRef.current.scrollTop =
        newScrollHeight - prevScrollHeightRef.current
    }
  }, [allData])

  // ── IntersectionObserver watching the top sentinel ─────────────────────────
  useEffect(() => {
    const sentinel = topSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          setPage(prev => {
            const next = prev + 1
            fetchData(next)
            return next
          })
        }
      },
      {
        root: containerRef.current, // observe within the chat container
        threshold: 0.1,
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, fetchData]) // re-subscribe when hasMore changes (stops after last page)

  return (
    <div className="text-black flex flex-col items-center pt-10 justify-center">
      <div className="mb-2 font-bold text-lg">Chat</div>

      <div
        ref={containerRef}
        className="w-[400px] h-[500px] overflow-y-auto rounded-xl bg-blue-100 flex flex-col p-2 gap-1"
      >
        {/* ── Top sentinel: becomes visible when user scrolls to the top ── */}
        <div ref={topSentinelRef} className="h-px w-full shrink-0" />

        {/* ── Loading indicator ── */}
        {loadingRef.current && (
          <div className="text-center text-sm text-gray-400 py-1 animate-pulse">
            Loading older messages…
          </div>
        )}

        {/* ── "No more messages" label ── */}
        {!hasMore && allData.length > 0 && (
          <div className="text-center text-xs text-gray-400 py-1">
            — Beginning of conversation —
          </div>
        )}

        {/* ── Messages ── */}
        {allData.map((item: any, index: number) => {
          // Alternate sides to simulate a real chat
          const isMine = index % 2 === 0
          return (
            <div
              key={`${item.id}-${index}`}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  isMine
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm'
                }`}
              >
                {item.title}
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-2 text-xs text-gray-400">
        {allData.length} messages loaded · Page {page}
        {!hasMore && ' · All loaded'}
      </p>
    </div>
  )
}

export default ChatBox














// "use client";
// import { useState, useEffect, useRef, useCallback } from "react";

// const API_CONSTANTS = {
//   BASE_URL: "https://jsonplaceholder.typicode.com/posts",
//   LIMIT: 20,
//   COUNT: 60,
// };

// interface Post {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// }

// const ChatBox = () => {
//   const [data, setData] = useState<Post[]>([]);
//   const [page, setPage] = useState(1);

//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const loaderRef = useRef<HTMLDivElement | null>(null);
//   const loadingRef = useRef(false);
//   const initialLoadRef = useRef<boolean>(true);
//   // data fetching

//   const previousHeight = useRef<number>(0);
//   const [hasMore, setHasMore] = useState(true);
//   console.log(loaderRef.current ,"loading current")
//   // if(data.length <API_CONSTANTS.COUNT){
//   //     setHasMore(false);
//   // }

//   const fetchData = async () => {
//     if (loadingRef.current) return;
//     try {
//       loadingRef.current = true;
//       const res = await fetch(
//         `${API_CONSTANTS.BASE_URL}?_limit=${API_CONSTANTS.LIMIT}&_page=${page}`,
//       );

//       const result = await res.json();
//       if (result.length == 0) {
//         setHasMore(false);
//         return;
//       }
//       setData((prev) => {
//         const merged = [...result, ...prev];
//         if (merged.length >= API_CONSTANTS.COUNT) {
//           setHasMore(false); // total hit 60 → stop
//         }
//         return merged;
//       });
//       // if(data.length<API_CONSTANTS.COUNT){
//       //     setHasMore(false);
//       // }
//     } catch (err: any) {
//       console.log(err, "err");
//     } finally {
//       loadingRef.current = false;
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page]);

//   // scrolling
//   useEffect(() => {
   
//     if (!containerRef.current) {
//       return;
//     }

//     if (initialLoadRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//       previousHeight.current = containerRef.current.scrollHeight;
//       initialLoadRef.current = false;
//     } else {
//       const newHeight =
//         containerRef.current.scrollHeight - previousHeight.current;

//       containerRef.current.scrollTop = newHeight;
//       previousHeight.current = containerRef.current.scrollHeight;
//     }
//   }, [data]);

//   // observer

//   console.log(hasMore, "hasMore");

//   useEffect(() => {
//     if (!loaderRef.current || !containerRef.current) return;

//     const node = loaderRef.current;
//     console.log("inside observer effect");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
//           console.log("hass loading observer");
//           setPage((page) => page + 1);
//         }
//       },
//       {
//         threshold: 0.1,
//         root: containerRef.current,
//       },
//     );

//     observer.observe(node);

//     return () => {
//       if (node) {
//         observer.unobserve(node);
//       }
//     };
//   }, [hasMore]);

//   return (
//     <div className="w-full flex flex-col items-center pt-10">
//       <div>Chat Box</div>
//       <div
//         ref={containerRef}
//         className="w-[500px] h-[500px] overflow-y-auto bg-blue-200 mt-2 rounded-xl"
//       >
//         {hasMore && <div ref={loaderRef} className="h-1 pb-2 " >Loading ..</div>}

//         <div>
//           {data?.map((item, ix) => {
//             return (
//               <div key={item.id} className="border-amber-200">
//                 {item.title}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
