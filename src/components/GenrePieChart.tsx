import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts";
import type { GenreStat } from "../Types/genreTypes";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import type { PieProps } from "recharts";
import { capitalizeWords } from "../Helpers/Helpers";
const SPOTIFY_COLORS = [
  "#1DB954",
  "#1ED760",
  "#2EBE73",
  "#4AD991",
  "#6EE7B7",
  "#9AE6B4",
  "#38B2AC",
  "#4299E1",
  "#F6AD55",
  "#ED8936",
  "#E53E3E",
  "#D53F8C",
  "#805AD5",
];

interface GenrePieChartProps {
  data: GenreStat[];
  className?: string;
}

type PieActiveProps = PieProps & {
  activeIndex?: number;
  activeShape?: (props: PieSectorDataItem) => React.ReactElement;
  onMouseEnter?: (data: PieSectorDataItem, index: number) => void;
  onMouseLeave?: () => void;
};

const PieWithActive = Pie as unknown as React.FC<PieActiveProps>;

type RechartsTooltipPayload = {
  payload: GenreStat;
  value: number;
  color?: string;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: RechartsTooltipPayload[];
  chartData: GenreStat[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  chartData,
}) => {
  if (
    active &&
    payload &&
    payload.length > 0 &&
    chartData &&
    chartData.length > 0
  ) {
    const { genre, count } = payload[0].payload;
    const total = chartData.reduce((sum, g) => sum + g.count, 0);
    const percentage = total > 0 ? ((count / total) * 100).toFixed(0) : "0";

    return (
      <div className="p-3 rounded-lg bg-gray-700 shadow-md text-left">
        <p className="text-white text-base font-bold text-left">
          {capitalizeWords(genre)}
        </p>
        <p className="text-green-500 text-sm text-left">
          {percentage}% of listening time
        </p>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: PieSectorDataItem): React.ReactElement => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  const genre = (payload as GenreStat)?.genre ?? "Unknown";

  return (
    <g
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        transition: "transform 0.15s ease",
        transform: "scale(1.05)",
      }}
    >
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius ?? 0}
        outerRadius={(outerRadius ?? 0) + 10}
        startAngle={startAngle ?? 0}
        endAngle={endAngle ?? 0}
        fill={fill}
      />
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-sm font-semibold"
      >
        {`${capitalizeWords(genre)} ${((percent ?? 0) * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const GenrePieChart: React.FC<GenrePieChartProps> = ({ data, className }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const chartData = useMemo<GenreStat[]>(() => {
    if (!data) return [];
    const sorted = [...data].sort((a, b) => b.count - a.count);
    const top = sorted.slice(0, 7);
    const rest = sorted.slice(7);
    const othersCount = rest.reduce((sum, g) => sum + g.count, 0);
    return othersCount > 0
      ? [...top, { genre: "Others", count: othersCount }]
      : top;
  }, [data]);

  if (!data || data.length === 0) return <p>No genre data available.</p>;

  const pieProps: PieProps = {
    data: chartData,
    dataKey: "count",
    nameKey: "genre",
    cx: "50%",
    cy: "50%",
    outerRadius: 120,
    innerRadius: 60,
    paddingAngle: 0,
    stroke: "none",
    labelLine: false,
    isAnimationActive: false,
    label: ({ name, percent }) =>
      percent && percent > 0.05
        ? `${capitalizeWords(name)} ${(percent * 100).toFixed(0)}%`
        : "",
  };

  return (
    <div
      className={`rounded-2xl bg-gradient-to-b from-gray-900 to-black shadow-md p-10 ${
        className || ""
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🎵 Genre Breakdown
        </h2>
        <p className="text-muted-foreground">
          Your favorite music genres based on listening time
        </p>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 30, right: 20, bottom: 20, left: 20 }}>
            <PieWithActive
              {...pieProps}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
              isAnimationActive={false}
              animationDuration={400}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={SPOTIFY_COLORS[index % SPOTIFY_COLORS.length]}
                />
              ))}
            </PieWithActive>

            <Tooltip
              content={(props) => (
                <CustomTooltip {...props} chartData={chartData} />
              )}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-foreground">
                  {capitalizeWords(value)}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GenrePieChart;
