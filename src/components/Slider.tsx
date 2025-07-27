// components/LimitSlider.tsx// components/LimitSlider.tsx

import React from "react";

type Props = {
  limit: number;
  setLimit: (value: number) => void;
};

const LimitSlider: React.FC<Props> = ({ limit, setLimit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
  };

  const handleReset = () => {
    setLimit(20); // default value
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <button
        onClick={handleReset}
        className="text-sm text-[#1DB954] hover:underline"
      >
         Limit
      </button>

      <div className="flex items-center w-full gap-3">
     

        <input
          id="limit"
          type="range"
          min={1}
          max={50}
          value={limit}
          onChange={handleChange}
          className="w-full h-1 rounded-lg appearance-none bg-gray-600 cursor-pointer accent-[#1DB954]"
        />

        <span className="text-sm font-semibold text-gray-100 w-6 text-right">
          {limit}
        </span>
      </div>
    </div>
  );
};

export default LimitSlider;
