import { useEffect, useState, useRef } from "react";


interface DebounceProps{
   searchTerm:string;
   duration:number;
}
export default function useDebounce({ searchTerm,duration}: DebounceProps) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current != null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedTerm(searchTerm), duration);

    return () => {
      if (timerRef.current != null) clearTimeout(timerRef.current);
    };
  }, [searchTerm, duration]);

  return debouncedTerm;
}
