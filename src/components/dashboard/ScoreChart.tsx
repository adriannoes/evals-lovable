import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { date: "Mon", score: 82 },
  { date: "Tue", score: 78 },
  { date: "Wed", score: 85 },
  { date: "Thu", score: 88 },
  { date: "Fri", score: 84 },
  { date: "Sat", score: 90 },
  { date: "Sun", score: 87 },
];

export function ScoreChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Score Trend</h3>
        <p className="text-sm text-muted-foreground">Average agent performance over time</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" vertical={false} />
            <XAxis 
              dataKey="date" 
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
              itemStyle={{ color: "hsl(199, 89%, 48%)" }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="hsl(199, 89%, 48%)" 
              strokeWidth={2.5}
              fill="url(#scoreGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
