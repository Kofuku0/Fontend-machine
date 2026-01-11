'use client';
import { useState } from "react";

interface AccordionItemProps{
      title:string;
      value:string;
      contents:string;
}

interface sectionProps{
    sections:AccordionItemProps[];
}

export default function Accordion({sections}:sectionProps) {
  const [openSections, setOpenSections] = useState(new Set());

  return (
    <div className="flex w-full p-10 flex-col">
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value);

        return (
          <div
            key={value}
            className="flex flex-col gap-1 border-t border-gray-200 py-1 first:border-t-0"
          >
            <button
              type="button"
              onClick={() => {
                setOpenSections((prev) => {
                  const next = new Set(prev);
                  next.has(value)
                    ? next.delete(value)
                    : next.add(value);
                  return next;
                });
              }}
              className="flex w-full items-center justify-between rounded px-1 py-1 text-left font-medium hover:bg-gray-500 "
            >
              {title}

              {/* Arrow Icon */}
              <span
                aria-hidden
                className={`inline-block h-2 w-2 border-r-2 border-b-2 border-current transition-transform duration-200 ${
                  isExpanded
                    ? "translate-y-0.5 -rotate-[135deg]"
                    : "-translate-y-0.5 rotate-45"
                }`}
              />
            </button>

            <div
              hidden={!isExpanded}
              className="px-1 py-1 text-sm leading-snug"
            >
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}
