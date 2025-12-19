import { Workflow, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const processes = [
  { id: "all", name: "All Processes", count: 156 },
  { id: "invoice", name: "Invoice Processing", count: 45 },
  { id: "onboarding", name: "Employee Onboarding", count: 32 },
  { id: "purchase", name: "Purchase Requests", count: 28 },
  { id: "support", name: "Support Tickets", count: 51 },
];

export function ProcessFilter() {
  const [selected, setSelected] = useState("all");

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <Workflow className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Filter by Process</h3>
      </div>

      <div className="space-y-1">
        {processes.map((process) => (
          <button
            key={process.id}
            onClick={() => setSelected(process.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
              selected === process.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>{process.name}</span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                selected === process.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {process.count}
              </span>
              {selected === process.id && <Check className="h-4 w-4" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
