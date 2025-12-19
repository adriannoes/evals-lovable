import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const timeRanges = ["24h", "7d", "30d", "90d"];

const data24h = [
  { time: "00:00", score: 92, passed: 12, failed: 1 },
  { time: "04:00", score: 94, passed: 15, failed: 0 },
  { time: "08:00", score: 91, passed: 22, failed: 2 },
  { time: "12:00", score: 95, passed: 28, failed: 1 },
  { time: "16:00", score: 93, passed: 25, failed: 2 },
  { time: "20:00", score: 94, passed: 18, failed: 1 },
  { time: "Now", score: 94, passed: 10, failed: 0 },
];

const data7d = [
  { time: "Mon", score: 88, passed: 145, failed: 12 },
  { time: "Tue", score: 91, passed: 168, failed: 10 },
  { time: "Wed", score: 93, passed: 182, failed: 8 },
  { time: "Thu", score: 90, passed: 175, failed: 14 },
  { time: "Fri", score: 94, passed: 192, failed: 7 },
  { time: "Sat", score: 92, passed: 85, failed: 5 },
  { time: "Sun", score: 94, passed: 78, failed: 3 },
];

const data30d = [
  { time: "Week 1", score: 85, passed: 620, failed: 52 },
  { time: "Week 2", score: 88, passed: 695, failed: 45 },
  { time: "Week 3", score: 91, passed: 745, failed: 38 },
  { time: "Week 4", score: 94, passed: 812, failed: 32 },
];

const data90d = [
  { time: "Month 1", score: 78, passed: 2100, failed: 280 },
  { time: "Month 2", score: 85, passed: 2450, failed: 195 },
  { time: "Month 3", score: 94, passed: 2890, failed: 125 },
];

const dataMap: Record<string, typeof data24h> = {
  "24h": data24h,
  "7d": data7d,
  "30d": data30d,
  "90d": data90d,
};

export function PerformanceChart() {
  const [selectedRange, setSelectedRange] = useState("7d");
  const data = dataMap[selectedRange];

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Over Time</h3>
          <p className="text-sm text-muted-foreground">Score trend and evaluation volume</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                selectedRange === range
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="scoreGradientDetail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="passedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 12 }}
              domain={[60, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(214, 20%, 90%)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px -1px hsla(215, 25%, 15%, 0.07)",
              }}
              labelStyle={{ color: "hsl(215, 25%, 15%)", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2.5}
              fill="url(#scoreGradientDetail)"
              name="Score %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Passed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-sm text-muted-foreground">Failed</span>
        </div>
      </div>
    </div>
  );
}
