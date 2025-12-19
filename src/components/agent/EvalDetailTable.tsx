import { useState } from "react";
import { CheckCircle2, XCircle, Clock, MoreHorizontal, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Evaluation {
  id: string;
  timestamp: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  score: number;
  status: "passed" | "failed" | "pending";
  duration: string;
  details: {
    accuracy: number;
    relevance: number;
    completeness: number;
  };
}

const evaluations: Evaluation[] = [
  {
    id: "EVAL-1001",
    timestamp: "2024-01-15 14:32:18",
    input: "Invoice #INV-2024-001 from Acme Corp",
    expectedOutput: "Category: Supplier Invoice",
    actualOutput: "Category: Supplier Invoice",
    score: 98,
    status: "passed",
    duration: "0.8s",
    details: { accuracy: 98, relevance: 100, completeness: 96 },
  },
  {
    id: "EVAL-1002",
    timestamp: "2024-01-15 14:28:45",
    input: "Purchase Order #PO-7842 for office supplies",
    expectedOutput: "Category: Purchase Order",
    actualOutput: "Category: Purchase Order",
    score: 100,
    status: "passed",
    duration: "1.1s",
    details: { accuracy: 100, relevance: 100, completeness: 100 },
  },
  {
    id: "EVAL-1003",
    timestamp: "2024-01-15 14:22:10",
    input: "Employee expense report - Q4 travel",
    expectedOutput: "Category: Expense Report",
    actualOutput: "Category: Invoice",
    score: 45,
    status: "failed",
    duration: "2.3s",
    details: { accuracy: 40, relevance: 55, completeness: 40 },
  },
  {
    id: "EVAL-1004",
    timestamp: "2024-01-15 14:18:33",
    input: "Contract renewal agreement - ABC Ltd",
    expectedOutput: "Category: Legal Document",
    actualOutput: "Category: Legal Document",
    score: 95,
    status: "passed",
    duration: "1.5s",
    details: { accuracy: 95, relevance: 98, completeness: 92 },
  },
  {
    id: "EVAL-1005",
    timestamp: "2024-01-15 14:15:02",
    input: "Tax document processing request",
    expectedOutput: "Category: Tax Document",
    actualOutput: "Processing...",
    score: 0,
    status: "pending",
    duration: "-",
    details: { accuracy: 0, relevance: 0, completeness: 0 },
  },
];

const statusConfig = {
  passed: { icon: CheckCircle2, className: "text-success bg-success/10" },
  failed: { icon: XCircle, className: "text-destructive bg-destructive/10" },
  pending: { icon: Clock, className: "text-warning bg-warning/10 animate-pulse-soft" },
};

export function EvalDetailTable() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden animate-slide-up">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Evaluation History</h3>
          <p className="text-sm text-muted-foreground">Detailed view of all evaluations with drill-down</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="outline" size="sm">Filter</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="w-10 px-5 py-3"></th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Timestamp</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Input</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Score</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {evaluations.map((evaluation) => {
              const StatusIcon = statusConfig[evaluation.status].icon;
              const isExpanded = expandedRow === evaluation.id;

              return (
                <>
                  <tr
                    key={evaluation.id}
                    className={cn(
                      "group transition-colors cursor-pointer",
                      isExpanded ? "bg-muted/50" : "hover:bg-muted/30"
                    )}
                    onClick={() => setExpandedRow(isExpanded ? null : evaluation.id)}
                  >
                    <td className="px-5 py-4">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-primary">{evaluation.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{evaluation.timestamp}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-foreground max-w-xs truncate block">{evaluation.input}</span>
                    </td>
                    <td className="px-5 py-4">
                      {evaluation.status !== "pending" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-12 overflow-hidden rounded-full bg-muted">
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
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>

                  {/* Expanded Details Row */}
                  {isExpanded && (
                    <tr key={`${evaluation.id}-details`} className="bg-muted/30">
                      <td colSpan={8} className="px-5 py-4">
                        <div className="pl-9 grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Input/Output */}
                          <div className="lg:col-span-2 space-y-4">
                            <div className="rounded-lg border border-border bg-card p-4">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Expected Output</p>
                              <p className="text-sm text-foreground font-mono bg-muted/50 rounded-md p-2">{evaluation.expectedOutput}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-card p-4">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Actual Output</p>
                              <p className={cn(
                                "text-sm font-mono rounded-md p-2",
                                evaluation.status === "passed" ? "bg-success/10 text-success" : evaluation.status === "failed" ? "bg-destructive/10 text-destructive" : "bg-muted/50 text-muted-foreground"
                              )}>
                                {evaluation.actualOutput}
                              </p>
                            </div>
                          </div>

                          {/* Score Breakdown */}
                          <div className="rounded-lg border border-border bg-card p-4">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">Score Breakdown</p>
                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-muted-foreground">Accuracy</span>
                                  <span className="text-sm font-medium text-foreground">{evaluation.details.accuracy}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                  <div
                                    className={cn(
                                      "h-full rounded-full transition-all",
                                      evaluation.details.accuracy >= 85 ? "bg-success" : evaluation.details.accuracy >= 70 ? "bg-warning" : "bg-destructive"
                                    )}
                                    style={{ width: `${evaluation.details.accuracy}%` }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-muted-foreground">Relevance</span>
                                  <span className="text-sm font-medium text-foreground">{evaluation.details.relevance}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                  <div
                                    className={cn(
                                      "h-full rounded-full transition-all",
                                      evaluation.details.relevance >= 85 ? "bg-success" : evaluation.details.relevance >= 70 ? "bg-warning" : "bg-destructive"
                                    )}
                                    style={{ width: `${evaluation.details.relevance}%` }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-muted-foreground">Completeness</span>
                                  <span className="text-sm font-medium text-foreground">{evaluation.details.completeness}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                  <div
                                    className={cn(
                                      "h-full rounded-full transition-all",
                                      evaluation.details.completeness >= 85 ? "bg-success" : evaluation.details.completeness >= 70 ? "bg-warning" : "bg-destructive"
                                    )}
                                    style={{ width: `${evaluation.details.completeness}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border px-5 py-4">
        <p className="text-sm text-muted-foreground">Showing 5 of 1,248 evaluations</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
