"use client";
import { clear } from "console";
import React, { useEffect, useRef } from "react";

interface ProgressBarProps {
  value?: number;
  outofValue?: number;
  loader?: boolean;
}
const index = ({ value, outofValue, loader = false }: ProgressBarProps) => {
  console.log("rendering");
  const progress = ((value || 0) / (outofValue || 100)) * 100;
  const [progressWidth, setProgressWidth] = React.useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current!);
        }
        return Math.min(prev + 10, 100);
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  return (
    <div className="w-full h-50 flex gap-10 items-center justify-center">
      <div className="h-12.5 w-70.5 border flex items-center justify-center border-gray-300 bg-blue-200 rounded-full overflow-hidden">
        <div
          style={{
            transform: `${
              loader
                ? `translateX(-${100 - progressWidth}%)`
                : `translateX(-${100 - progress}%)`
            } `,
          }}
          className="bg-blue-400 w-full h-full"
        >
        </div>
      </div>
      {loader ? (
        <div>
         with loader
        </div>
      ) : <div>  {value} / {outofValue}</div>}
    </div>
  );
};

export default index;
