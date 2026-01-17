// the direct use of this component is in page.tsx (source file)

import { useState } from "react";
interface itemsProps {
  value: string;
  label: string;
  panel: string;
}

interface TabsProps {
  items: itemsProps[];
}
export default function Tabs({ items }: TabsProps) {
  const [deafultTab, setDefaultTab] = useState(items[0].value);
  return (
    <div>
      <div className="flex items-center justify-center w-full gap-6 mt-10">
        {items.map(({ value, label }: itemsProps) => {
          const isActive = deafultTab === value;
          return (
            <button
              className={`py-4 px-2 rounded-xl ${
                isActive ? "bg-blue-700  text-black" : "hover:bg-blue-400"
              }`}
              key={value}
              onClick={() => {
                setDefaultTab(value);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-[20px]">
        {items.map(({ panel, value }) => {
          return (
            <div key={value} hidden={value != deafultTab}>
              {panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
