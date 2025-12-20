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
      className="group block rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:border-primary/30"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", iconColor)}>
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex items-center gap-1">
          <TrendIcon className={cn("h-4 w-4", trendColors[trend])} />
          <span className={cn("text-sm font-medium", trendColors[trend])}>
            {trend === "up" ? "+2.3%" : trend === "down" ? "-1.5%" : "0%"}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {useCasesCount} use cases • {evaluationsToday} evals today
      </p>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">Avg. Score</span>
        <span className={cn(
          "text-2xl font-bold",
          score >= 90 ? "text-success" : score >= 70 ? "text-warning" : "text-destructive"
        )}>
          {score}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            score >= 90 ? "bg-success" : score >= 70 ? "bg-warning" : "bg-destructive"
          )}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Top: <span className="text-foreground font-medium">{topUseCase}</span>
        </div>
        <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium">View Details</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
