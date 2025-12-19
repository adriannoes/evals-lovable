import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Passed", value: 1176, color: "hsl(142, 71%, 45%)" },
  { name: "Failed", value: 72, color: "hsl(0, 72%, 51%)" },
  { name: "Pending", value: 12, color: "hsl(38, 92%, 50%)" },
];

const failureReasons = [
  { reason: "Timeout", count: 28, percentage: 38.9 },
  { reason: "Incorrect Classification", count: 22, percentage: 30.6 },
  { reason: "Missing Data", count: 14, percentage: 19.4 },
  { reason: "API Error", count: 8, percentage: 11.1 },
];

export function SuccessBreakdown() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-slide-up">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Success/Failure Breakdown</h3>
        <p className="text-sm text-muted-foreground">Evaluation outcomes distribution</p>
      </div>

      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(214, 20%, 90%)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px -1px hsla(215, 25%, 15%, 0.07)",
              }}
              formatter={(value: number) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{item.value}</span>
              <span className="text-xs text-muted-foreground">
                ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-3">Top Failure Reasons</p>
        <div className="space-y-2">
          {failureReasons.map((item) => (
            <div key={item.reason} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{item.reason}</span>
                  <span className="text-xs font-medium text-foreground">{item.count}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-destructive/70 transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
