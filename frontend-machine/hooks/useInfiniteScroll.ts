

import { useRef,useEffect, use } from "react"
type useInfiniteScrollProps= {
   setPage: React.Dispatch<React.SetStateAction<number>>;
   setHasMore:React.Dispatch<React.SetStateAction<boolean>>;
   total_count:number;
   dataLength:number;

}
export default function useInfiniteScroll(
    {setPage,total_count,setHasMore,dataLength}:useInfiniteScrollProps
) {
  // Hook logic for infinite scroll can be implemented here
   
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  useEffect(()=>{
      const observer = new IntersectionObserver((entries)=>{
          if(entries[0].isIntersecting){
              setPage(prev=>prev+1);
              observer.unobserve(lastItem!);
          }
      });

      const lastItem = lastItemRef.current;

      if(!lastItem){
         return;
      }

      if(dataLength >= total_count){
        setHasMore(false);
          console.log('No more data to load');
          return;
      }
      if(lastItem){
          observer.observe(lastItem);
      }

      return () => observer.disconnect();
  },[dataLength])
    

  return {lastItemRef};

}