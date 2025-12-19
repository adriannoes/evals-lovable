import { CheckCircle2, XCircle, Clock, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Evaluation {
  id: string;
  agent: string;
  process: string;
  score: number;
  status: "passed" | "failed" | "pending";
  timestamp: string;
  duration: string;
}

const evaluations: Evaluation[] = [
  { id: "EVAL-001", agent: "Document Classifier", process: "Invoice Processing", score: 94, status: "passed", timestamp: "2 min ago", duration: "1.2s" },
  { id: "EVAL-002", agent: "Data Extractor", process: "Employee Onboarding", score: 78, status: "passed", timestamp: "15 min ago", duration: "2.8s" },
  { id: "EVAL-003", agent: "Approval Bot", process: "Purchase Requests", score: 45, status: "failed", timestamp: "32 min ago", duration: "0.8s" },
  { id: "EVAL-004", agent: "Email Parser", process: "Support Tickets", score: 0, status: "pending", timestamp: "1 hour ago", duration: "-" },
  { id: "EVAL-005", agent: "Task Assigner", process: "Project Management", score: 89, status: "passed", timestamp: "2 hours ago", duration: "1.5s" },
];

const statusConfig = {
  passed: { icon: CheckCircle2, className: "text-success bg-success/10" },
  failed: { icon: XCircle, className: "text-destructive bg-destructive/10" },
  pending: { icon: Clock, className: "text-warning bg-warning/10 animate-pulse-soft" },
};

export function EvaluationTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Evaluations</h3>
          <p className="text-sm text-muted-foreground">Latest AI agent evaluation results</p>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Agent</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Process</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Score</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {evaluations.map((evaluation) => {
              const StatusIcon = statusConfig[evaluation.status].icon;
              return (
                <tr key={evaluation.id} className="group transition-colors hover:bg-muted/30">
                  <td className="px-5 py-4">
                    <span className="font-mono text-sm font-medium text-primary">{evaluation.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-medium text-foreground">{evaluation.agent}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-muted-foreground">{evaluation.process}</span>
                  </td>
                  <td className="px-5 py-4">
                    {evaluation.status !== "pending" ? (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              evaluation.score >= 85 ? "bg-success" : evaluation.score >= 70 ? "bg-warning" : "bg-destructive"
                            )}
                            style={{ width: `${evaluation.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">{evaluation.score}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1", statusConfig[evaluation.status].className)}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium capitalize">{evaluation.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-muted-foreground">{evaluation.duration}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-muted-foreground">{evaluation.timestamp}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
