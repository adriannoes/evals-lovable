import { Bot, ClipboardCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { EvaluationTable } from "@/components/dashboard/EvaluationTable";
import { ScoreChart } from "@/components/dashboard/ScoreChart";
import { ProcessFilter } from "@/components/dashboard/ProcessFilter";

const metrics = [
  { title: "Total Agents", value: "24", change: "+3", changeType: "positive" as const, icon: Bot, iconColor: "primary" as const },
  { title: "Evaluations Today", value: "156", change: "+12%", changeType: "positive" as const, icon: ClipboardCheck, iconColor: "success" as const },
  { title: "Avg. Score", value: "87%", change: "+2.4%", changeType: "positive" as const, icon: TrendingUp, iconColor: "accent" as const },
  { title: "Issues Detected", value: "8", change: "-4", changeType: "positive" as const, icon: AlertTriangle, iconColor: "warning" as const },
];

const agents = [
  { name: "Document Classifier", process: "Invoice Processing", score: 94, trend: "up" as const, evaluations: 45, lastEval: "2 min ago", status: "active" as const },
  { name: "Data Extractor", process: "Employee Onboarding", score: 78, trend: "down" as const, evaluations: 32, lastEval: "15 min ago", status: "warning" as const },
  { name: "Approval Bot", process: "Purchase Requests", score: 92, trend: "up" as const, evaluations: 28, lastEval: "1 hour ago", status: "active" as const },
  { name: "Email Parser", process: "Support Tickets", score: 85, trend: "stable" as const, evaluations: 51, lastEval: "30 min ago", status: "active" as const },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="pl-64">
        <Header />
        
        <div className="p-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={metric.title} style={{ animationDelay: `${index * 0.1}s` }}>
                <MetricCard {...metric} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Score Chart */}
            <div className="lg:col-span-2">
              <ScoreChart />
            </div>
            
            {/* Process Filter */}
            <ProcessFilter />
          </div>

          {/* Agent Cards */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI Agents Performance</h3>
                <p className="text-sm text-muted-foreground">Monitor your agents across all processes</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {agents.map((agent, index) => (
                <div key={agent.name} style={{ animationDelay: `${index * 0.1}s` }}>
                  <AgentCard {...agent} />
                </div>
              ))}
            </div>
          </div>

          {/* Evaluations Table */}
          <EvaluationTable />
        </div>
      </main>
    </div>
  );
};

export default Index;
