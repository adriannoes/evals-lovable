import { Link } from "react-router-dom";
import { Bot, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
  id?: string;
  name: string;
  process: string;
  score: number;
  trend: "up" | "down" | "stable";
  evaluations: number;
  lastEval: string;
  status: "active" | "inactive" | "warning";
}

const statusClasses = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-border",
  warning: "bg-warning/10 text-warning border-warning/20",
};

const statusLabels = {
  active: "Active",
  inactive: "Inactive",
  warning: "Needs Review",
};

export function AgentCard({ id, name, process, score, trend, evaluations, lastEval, status }: AgentCardProps) {
  const agentId = id || name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link to={`/agent/${agentId}`} className="block">
      <div className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-elevated hover:border-primary/30 animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
              <p className="text-sm text-muted-foreground">{process}</p>
            </div>
          </div>
          <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full border", statusClasses[status])}>
            {statusLabels[status]}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Score</p>
            <div className="flex items-center gap-1.5">
              <span className={cn(
                "text-xl font-bold",
                score >= 85 ? "text-success" : score >= 70 ? "text-warning" : "text-destructive"
              )}>
                {score}%
              </span>
              {trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
              {trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Evals</p>
            <p className="text-xl font-bold text-foreground">{evaluations}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Last Eval</p>
            <p className="text-sm font-medium text-foreground">{lastEval}</p>
          </div>
        </div>

        <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-primary">
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Link>
  );
}
