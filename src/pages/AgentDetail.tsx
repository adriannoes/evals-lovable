import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Bot, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Activity,
  Target,
  Zap,
  Calendar,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PerformanceChart } from "@/components/agent/PerformanceChart";
import { SuccessBreakdown } from "@/components/agent/SuccessBreakdown";
import { EvalDetailTable } from "@/components/agent/EvalDetailTable";
import { cn } from "@/lib/utils";

// Mock data for agent
const agentData = {
  id: "agent-1",
  name: "Document Classifier",
  process: "Invoice Processing",
  description: "Automatically classifies and routes incoming documents based on content analysis and metadata extraction.",
  status: "active" as const,
  score: 94,
  trend: "up" as "up" | "down" | "stable",
  totalEvaluations: 1248,
  passRate: 94.2,
  avgResponseTime: "1.2s",
  lastEval: "2 min ago",
  createdAt: "Jan 15, 2024",
};

const metrics = [
  { label: "Total Evaluations", value: "1,248", icon: Activity, color: "primary" as const },
  { label: "Pass Rate", value: "94.2%", icon: Target, color: "success" as const },
  { label: "Avg Response Time", value: "1.2s", icon: Zap, color: "accent" as const },
  { label: "Last 24h Evals", value: "156", icon: Calendar, color: "warning" as const },
];

const iconColorClasses = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  accent: "bg-accent/10 text-accent",
};

const statusClasses = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-border",
  warning: "bg-warning/10 text-warning border-warning/20",
};

const AgentDetail = () => {
  const { agentId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="pl-64">
        <Header />
        
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/" className="hover:text-foreground transition-colors">AI Agents</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{agentData.name}</span>
          </div>

          {/* Back button and header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <Link to="/">
                <Button variant="outline" size="icon" className="mt-1">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-lg">
                  <Bot className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-foreground">{agentData.name}</h1>
                    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full border", statusClasses[agentData.status])}>
                      Active
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">{agentData.process}</p>
                  <p className="text-sm text-muted-foreground max-w-xl">{agentData.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline">Configure</Button>
              <Button variant="gradient">Run Evaluation</Button>
            </div>
          </div>

          {/* Score Banner */}
          <div className="rounded-xl border border-border bg-card p-6 mb-6 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Current Score</p>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-4xl font-bold",
                    agentData.score >= 85 ? "text-success" : agentData.score >= 70 ? "text-warning" : "text-destructive"
                  )}>
                    {agentData.score}%
                  </span>
                  {agentData.trend === "up" && (
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm font-medium">+2.4%</span>
                    </div>
                  )}
                  {agentData.trend === "down" && (
                    <div className="flex items-center gap-1 text-destructive">
                      <TrendingDown className="h-5 w-5" />
                      <span className="text-sm font-medium">-1.2%</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="h-12 w-px bg-border" />

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Passed</p>
                    <p className="text-lg font-semibold text-foreground">1,176</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                    <XCircle className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Failed</p>
                    <p className="text-lg font-semibold text-foreground">72</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                    <Clock className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-lg font-semibold text-foreground">12</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last evaluated</p>
              <p className="font-medium text-foreground">{agentData.lastEval}</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {metrics.map((metric, index) => (
              <div 
                key={metric.label} 
                className="rounded-xl border border-border bg-card p-5 shadow-sm animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                  </div>
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", iconColorClasses[metric.color])}>
                    <metric.icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>
            <SuccessBreakdown />
          </div>

          {/* Evaluation History Table */}
          <EvalDetailTable />
        </div>
      </main>
    </div>
  );
};

export default AgentDetail;
