import { useEffect, useState, useRef } from "react";

export default function useDebounce({ searchTerm, duration }: any) {
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
