import { useId, useState } from "react";
import { sectionsProps, sectionProps } from "@/frontend-machine/types/accordian-types";
import useMounted from "@/frontend-machine/hooks/useMounted";
function getAccordionHeaderId(accordionId: string, value: string) {
  return accordionId + "-header-" + value;
}

function getAccordionPanelId(accordionId: string, value: string) {
  return accordionId + "-panel-" + value;
}

export default function AccordionIII({ sections }: sectionsProps) {
  const accordionId = useId();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="w-full max-w-2xl space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
      {sections.map(({ value, title, content }: sectionProps) => {
        const isExpanded = openSections.has(value);

        const headerId = getAccordionHeaderId(accordionId, value);
        const panelId = getAccordionPanelId(accordionId, value);

        return (
          <div
            key={value}
            className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
          >
            <button
              id={headerId}
              type="button"
              aria-controls={panelId}
              aria-expanded={isExpanded}
              onClick={() => {
                const newOpenSections = new Set(openSections);

                if (newOpenSections.has(value)) {
                  newOpenSections.delete(value);
                } else {
                  newOpenSections.add(value);
                }

                setOpenSections(newOpenSections);
              }}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="text-base font-semibold text-gray-900">
                {title}
              </span>

              {/* Chevron Icon */}
              <span
                aria-hidden={true}
                className={[
                  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-transform duration-200",
                  isExpanded ? "rotate-180" : "rotate-0",
                ].join(" ")}
              >
                ▼
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isExpanded}
              className="px-4 pb-4 text-sm leading-relaxed text-gray-700"
            >
              {content}
            </div>
          </div> 
        );
      })}
    </div>
  );
}
