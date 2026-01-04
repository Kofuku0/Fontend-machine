import React, { useEffect } from "react";

export default function useClickOutside(cb:any) {
  const ref = React.useRef<any>(null);

  const handleClick = (e: any) => {
      
       const node = ref.current;
       if(!node) return;
       if(node.contains(e.target)){
            cb();
       }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return ref;
}
