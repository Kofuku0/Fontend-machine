import { collectMeta } from "next/dist/build/utils";
import React, { useState } from "react";

import { sectionsProps } from "@/frontend-machine/types/accordian-types";
export default function AccordianII({ sections }: sectionsProps) {
  const [openSection, setOpenSection] = useState(new Set<string>());
  return (
    <div>
      {sections.map(({ title, value, content }) => {
        const isExanded = openSection.has(value);
        return (
          <div key={value} className="my-2 mx-2 ">

            <div className="w-full px-5 py-6 flex items-center justify-between rounded-xl bg-gray-500">
              <div className="">{title}</div>
              <div
                onClick={() => {
                   const newSet = new Set(openSection);
                   if(!newSet.has(value)){
                    newSet.add(value);
                   }else{
                      newSet.delete(value);
                   }
                   setOpenSection(newSet);
                }}
                className="mr-2"
              >
                {isExanded ? "−" : "+" }
              </div>
            </div>
            <div hidden={!isExanded}>{content}</div>
          </div>
        );
      })}
    </div>
  );
}
