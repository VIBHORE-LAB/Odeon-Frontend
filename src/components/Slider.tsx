import React from "react";
import { makeStyles } from "@mui/styles";

interface LimitSliderProps {
  limit: number;
  setLimit: (newLimit: number) => void;
}

const useStyles = makeStyles({
  sliderWrapper: {
    position: "relative",
    marginBottom: "1rem",
  },
  limitLabel: {
    position: "absolute",
    top: "-1.5rem",
    right: 0,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#22c55e", // Tailwind green-400
  },
  slider: {
    width: "100%",
    appearance: "none",
    height: "8px",
    borderRadius: "9999px",
    background: (props: { limit: number }) =>
      `linear-gradient(to right, #22c55e 0%, #22c55e ${props.limit * 2}%, #333 ${props.limit * 2}%, #333 100%)`,
    cursor: "pointer",

    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      height: "20px",
      width: "20px",
      borderRadius: "50%",
      background: "#22c55e",
      border: "2px solid white",
      marginTop: "-6px",
      boxShadow: "0 0 4px rgba(0,0,0,0.4)",
      transition: "background 0.2s ease",
    },

    "&::-webkit-slider-thumb:hover": {
      background: "#16a34a",
    },

    "&::-moz-range-thumb": {
      height: "20px",
      width: "20px",
      borderRadius: "50%",
      background: "#22c55e",
      border: "2px solid white",
      boxShadow: "0 0 4px rgba(0,0,0,0.4)",
      cursor: "pointer",
    },

    "&::-moz-range-track": {
      height: "8px",
      borderRadius: "9999px",
      background: (props: { limit: number }) =>
        `linear-gradient(to right, #22c55e 0%, #22c55e ${props.limit * 2}%, #333 ${props.limit * 2}%, #333 100%)`,
    },
  },
});

const LimitSlider: React.FC<LimitSliderProps> = ({ limit, setLimit }) => {
  const classes = useStyles({ limit });

  return (
    <div className="p-6 rounded-xl text-white w-full max-w-md mx-auto">
      <div className={classes.sliderWrapper}>
        <div className={classes.limitLabel}>{limit}</div>

        <input
          type="range"
          min={1}
          max={50}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className={classes.slider}
        />
      </div>
    </div>
  );
};

export default LimitSlider;
