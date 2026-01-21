import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor: "primary" | "success" | "warning" | "accent";
}

const iconColorClasses = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  accent: "bg-accent/10 text-accent",
} as const;

export function MetricCard({ title, value, change, changeType, icon: Icon, iconColor }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-card transition-shadow duration-200 hover:shadow-card-hover animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground font-sans">{value}</p>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconColorClasses[iconColor])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span
          className={cn(
            "text-sm font-medium",
            changeType === "positive" && "text-success",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-muted-foreground"
          )}
        >
          {change}
        </span>
        <span className="text-sm text-muted-foreground">vs last period</span>
      </div>
    </div>
  );
}
