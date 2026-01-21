import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus, ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaxonomyCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  score: number;
  trend: "up" | "down" | "stable";
  useCasesCount: number;
  evaluationsToday: number;
  topUseCase: string;
  iconColor: string;
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors = {
  up: "text-success",
  down: "text-destructive",
  stable: "text-muted-foreground",
};

export function TaxonomyCard({
  id,
  name,
  icon: Icon,
  score,
  trend,
  useCasesCount,
  evaluationsToday,
  topUseCase,
  iconColor,
}: TaxonomyCardProps) {
  const TrendIcon = trendIcons[trend];

  return (
    <Link
      to={`/taxonomy/${id}`}
      className="group block rounded-lg border border-border bg-card p-4 shadow-card hover:shadow-card-hover transition-all duration-200 hover:border-primary/40"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconColor)}>
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex items-center gap-1">
          <TrendIcon className={cn("h-4 w-4", trendColors[trend])} />
          <span className={cn("text-xs font-medium", trendColors[trend])}>
            {trend === "up" ? "+2.3%" : trend === "down" ? "-1.5%" : "0%"}
          </span>
        </div>
      </div>

      <h3 className="text-base font-semibold text-foreground font-sans mb-1">{name}</h3>
      <p className="text-xs text-muted-foreground mb-3">
        {useCasesCount} use cases • {evaluationsToday} evals today
      </p>

      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Avg. Score</span>
        <span className={cn(
          "text-xl font-bold font-sans",
          score >= 90 ? "text-success" : score >= 70 ? "text-warning" : "text-destructive"
        )}>
          {score}%
        </span>
      </div>

      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            score >= 90 ? "bg-success" : score >= 70 ? "bg-warning" : "bg-destructive"
          )}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Top: <span className="text-foreground font-medium">{topUseCase}</span>
        </div>
        <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium">View</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
