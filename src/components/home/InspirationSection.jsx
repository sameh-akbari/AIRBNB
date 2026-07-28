import { INSPIRATION_TAB_LABELS, inspirationTabContents } from "@/data";
import { useState } from "react";

function InspirationSection() {
  const [activeTab, setActiveTab] = useState("Popular");
  return (
    <>
      <section className="w-full bg-white py-12 px-6">
        <div className="max-w-[1760px] mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Inspiration for future getaways
          </h2>
          <div className="flex items-center gap-8 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {INSPIRATION_TAB_LABELS.map((label) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`text-sm cursor-pointer font-semibold whitespace-nowrap pb-2 ${
                  activeTab === label
                    ? "border-b-2 text-gray-900 border-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}>
                {label}
              </button>
            ))}
          </div>
          {inspirationTabContents[activeTab] && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {(() => {
                const destinations =
                  inspirationTabContents[activeTab].destinations;
                const itemsPerColumns = Math.ceil(destinations.length / 3);
                const columns = [
                  destinations.slice(0, itemsPerColumns),
                  destinations.slice(itemsPerColumns, itemsPerColumns * 2),
                  destinations.slice(itemsPerColumns * 2),
                ];
                return columns.map((column, colIndex) => (
                  <div key={colIndex} className="space-y-4">
                    {column.map((col, index) => (
                      <a key={index} href="#" className="block hover:underline">
                        <div className="font-semibold text-gray-900">
                          {col.name}
                        </div>
                        <div className="text-sm text-gray-600">{col.type}</div>
                      </a>
                    ))}
                  </div>
                ));
              })()}
            </div>
          )}

          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm font-semibold text-gray-900 hover:underline flex items-center gap-1">
              Show more{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default InspirationSection;
