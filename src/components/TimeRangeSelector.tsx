import React from "react";

interface TimeRangeSelectorProps {
  selected: string;
  onChange: (range: string) => void;
}

const ranges = [
  { label: "Last 4 Weeks", value: "short_term" },
  { label: "Last 6 Months", value: "medium_term" },
  { label: "All Time", value: "long_term" },
];

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <div className="flex justify-center gap-3 mb-6">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
            ${
              selected === r.value
                ? "bg-green-500 text-black shadow-lg scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
};
