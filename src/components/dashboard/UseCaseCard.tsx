import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus, ArrowRight, FileText, Brain, MessageSquare, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UseCaseCardProps {
  id: string;
  taxonomyId: string;
  name: string;
  score: number;
  trend: "up" | "down" | "stable";
  evaluations: number;
  lastEval: string;
  capabilities: {
    docReader: number;
    agent: number;
    assistant: number;
  };
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

interface CapabilityBadgeProps {
  icon: LucideIcon;
  label: string;
  score: number;
}

function CapabilityBadge({ icon: Icon, label, score }: CapabilityBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50">
      <Icon className="h-3 w-3 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn(
        "text-xs font-semibold",
        score >= 90 ? "text-success" : score >= 70 ? "text-warning" : "text-destructive"
      )}>
        {score}%
      </span>
    </div>
  );
}

export function UseCaseCard({
  id,
  taxonomyId,
  name,
  score,
  trend,
  evaluations,
  lastEval,
  capabilities,
}: UseCaseCardProps) {
  const TrendIcon = trendIcons[trend];

  return (
    <Link
      to={`/taxonomy/${taxonomyId}/use-case/${id}`}
      className="group block rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:border-primary/30"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <div className="flex items-center gap-1">
          <TrendIcon className={cn("h-4 w-4", trendColors[trend])} />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-3xl font-bold",
            score >= 90 ? "text-success" : score >= 70 ? "text-warning" : "text-destructive"
          )}>
            {score}%
          </span>
          <div className="h-8 w-1 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "w-full transition-all duration-500",
                score >= 90 ? "bg-success" : score >= 70 ? "bg-warning" : "bg-destructive"
              )}
              style={{ height: `${score}%` }}
            />
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{evaluations} evals</p>
          <p className="text-xs text-muted-foreground">{lastEval}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <CapabilityBadge icon={FileText} label="IDP" score={capabilities.docReader} />
        <CapabilityBadge icon={Brain} label="Agent" score={capabilities.agent} />
        <CapabilityBadge icon={MessageSquare} label="Assist" score={capabilities.assistant} />
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-border">
        <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium">View Details</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
