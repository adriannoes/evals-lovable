import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  FileText,
  Brain,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Users,
  ShoppingCart,
  Monitor,
  Scale,
  LucideIcon
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { UseCaseCard } from "@/components/dashboard/UseCaseCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface TaxonomyData {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  score: number;
  trend: "up" | "down" | "stable";
  useCases: {
    id: string;
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
  }[];
  metrics: {
    totalEvaluations: number;
    passRate: number;
    avgProcessingTime: string;
    timeSaved: string;
  };
  performanceData: { date: string; docReader: number; agent: number; assistant: number }[];
}

const taxonomiesData: Record<string, TaxonomyData> = {
  finance: {
    id: "finance",
    name: "Finance",
    description: "Financial operations including invoicing, expense management, and credit analysis",
    icon: DollarSign,
    iconColor: "bg-emerald-500",
    score: 92,
    trend: "up",
    useCases: [
      { id: "invoice-processing", name: "Invoice Processing", score: 94, trend: "up", evaluations: 1250, lastEval: "2 min ago", capabilities: { docReader: 96, agent: 92, assistant: 88 } },
      { id: "expense-claims", name: "Expense Claims", score: 89, trend: "stable", evaluations: 820, lastEval: "15 min ago", capabilities: { docReader: 91, agent: 87, assistant: 85 } },
      { id: "credit-analysis", name: "Credit Analysis", score: 91, trend: "up", evaluations: 340, lastEval: "1 hour ago", capabilities: { docReader: 93, agent: 90, assistant: 82 } },
      { id: "payment-reconciliation", name: "Payment Reconciliation", score: 88, trend: "down", evaluations: 560, lastEval: "30 min ago", capabilities: { docReader: 90, agent: 86, assistant: 84 } },
    ],
    metrics: { totalEvaluations: 2970, passRate: 94, avgProcessingTime: "2.3 min", timeSaved: "94%" },
    performanceData: [
      { date: "Mon", docReader: 92, agent: 88, assistant: 82 },
      { date: "Tue", docReader: 93, agent: 89, assistant: 84 },
      { date: "Wed", docReader: 91, agent: 90, assistant: 85 },
      { date: "Thu", docReader: 94, agent: 91, assistant: 86 },
      { date: "Fri", docReader: 95, agent: 92, assistant: 87 },
      { date: "Sat", docReader: 96, agent: 92, assistant: 88 },
      { date: "Sun", docReader: 96, agent: 93, assistant: 88 },
    ],
  },
  hr: {
    id: "hr",
    name: "Human Resources",
    description: "HR operations including candidate screening, onboarding, and leave management",
    icon: Users,
    iconColor: "bg-blue-500",
    score: 87,
    trend: "up",
    useCases: [
      { id: "candidate-screening", name: "Candidate Screening", score: 89, trend: "up", evaluations: 450, lastEval: "5 min ago", capabilities: { docReader: 91, agent: 88, assistant: 85 } },
      { id: "employee-onboarding", name: "Employee Onboarding", score: 86, trend: "stable", evaluations: 320, lastEval: "20 min ago", capabilities: { docReader: 88, agent: 85, assistant: 82 } },
      { id: "leave-requests", name: "Leave Requests", score: 92, trend: "up", evaluations: 890, lastEval: "1 min ago", capabilities: { docReader: 94, agent: 91, assistant: 90 } },
      { id: "performance-reviews", name: "Performance Reviews", score: 78, trend: "down", evaluations: 180, lastEval: "2 hours ago", capabilities: { docReader: 80, agent: 76, assistant: 74 } },
    ],
    metrics: { totalEvaluations: 1840, passRate: 89, avgProcessingTime: "3.1 min", timeSaved: "87%" },
    performanceData: [
      { date: "Mon", docReader: 85, agent: 82, assistant: 78 },
      { date: "Tue", docReader: 86, agent: 83, assistant: 80 },
      { date: "Wed", docReader: 87, agent: 85, assistant: 81 },
      { date: "Thu", docReader: 88, agent: 86, assistant: 83 },
      { date: "Fri", docReader: 89, agent: 87, assistant: 84 },
      { date: "Sat", docReader: 90, agent: 88, assistant: 85 },
      { date: "Sun", docReader: 91, agent: 88, assistant: 85 },
    ],
  },
  procurement: {
    id: "procurement",
    name: "Procurement",
    description: "Procurement workflows including vendor management, PO processing, and contract analysis",
    icon: ShoppingCart,
    iconColor: "bg-purple-500",
    score: 85,
    trend: "stable",
    useCases: [
      { id: "vendor-onboarding", name: "Vendor Onboarding", score: 87, trend: "up", evaluations: 280, lastEval: "10 min ago", capabilities: { docReader: 89, agent: 86, assistant: 83 } },
      { id: "purchase-orders", name: "Purchase Orders", score: 84, trend: "stable", evaluations: 620, lastEval: "5 min ago", capabilities: { docReader: 86, agent: 83, assistant: 80 } },
      { id: "contract-review", name: "Contract Review", score: 82, trend: "down", evaluations: 150, lastEval: "1 hour ago", capabilities: { docReader: 84, agent: 80, assistant: 78 } },
    ],
    metrics: { totalEvaluations: 1050, passRate: 86, avgProcessingTime: "4.2 min", timeSaved: "82%" },
    performanceData: [
      { date: "Mon", docReader: 82, agent: 78, assistant: 75 },
      { date: "Tue", docReader: 83, agent: 79, assistant: 76 },
      { date: "Wed", docReader: 84, agent: 81, assistant: 78 },
      { date: "Thu", docReader: 85, agent: 82, assistant: 79 },
      { date: "Fri", docReader: 86, agent: 83, assistant: 80 },
      { date: "Sat", docReader: 86, agent: 83, assistant: 81 },
      { date: "Sun", docReader: 87, agent: 84, assistant: 81 },
    ],
  },
  it: {
    id: "it",
    name: "IT",
    description: "IT service management including ticket handling, access requests, and incident response",
    icon: Monitor,
    iconColor: "bg-cyan-500",
    score: 90,
    trend: "up",
    useCases: [
      { id: "ticket-triage", name: "Ticket Triage", score: 93, trend: "up", evaluations: 1580, lastEval: "1 min ago", capabilities: { docReader: 95, agent: 92, assistant: 90 } },
      { id: "access-requests", name: "Access Requests", score: 91, trend: "up", evaluations: 920, lastEval: "3 min ago", capabilities: { docReader: 93, agent: 90, assistant: 88 } },
      { id: "incident-response", name: "Incident Response", score: 86, trend: "stable", evaluations: 340, lastEval: "15 min ago", capabilities: { docReader: 88, agent: 85, assistant: 82 } },
    ],
    metrics: { totalEvaluations: 2840, passRate: 91, avgProcessingTime: "1.8 min", timeSaved: "91%" },
    performanceData: [
      { date: "Mon", docReader: 88, agent: 85, assistant: 82 },
      { date: "Tue", docReader: 89, agent: 86, assistant: 84 },
      { date: "Wed", docReader: 90, agent: 88, assistant: 85 },
      { date: "Thu", docReader: 92, agent: 89, assistant: 87 },
      { date: "Fri", docReader: 93, agent: 90, assistant: 88 },
      { date: "Sat", docReader: 94, agent: 91, assistant: 89 },
      { date: "Sun", docReader: 95, agent: 92, assistant: 90 },
    ],
  },
  legal: {
    id: "legal",
    name: "Legal",
    description: "Legal operations including contract analysis, compliance checks, and document review",
    icon: Scale,
    iconColor: "bg-amber-500",
    score: 83,
    trend: "down",
    useCases: [
      { id: "contract-analysis", name: "Contract Analysis", score: 85, trend: "stable", evaluations: 220, lastEval: "30 min ago", capabilities: { docReader: 87, agent: 84, assistant: 80 } },
      { id: "compliance-review", name: "Compliance Review", score: 82, trend: "down", evaluations: 180, lastEval: "1 hour ago", capabilities: { docReader: 84, agent: 80, assistant: 78 } },
      { id: "nda-processing", name: "NDA Processing", score: 81, trend: "down", evaluations: 140, lastEval: "2 hours ago", capabilities: { docReader: 83, agent: 79, assistant: 76 } },
    ],
    metrics: { totalEvaluations: 540, passRate: 84, avgProcessingTime: "5.5 min", timeSaved: "78%" },
    performanceData: [
      { date: "Mon", docReader: 84, agent: 80, assistant: 76 },
      { date: "Tue", docReader: 85, agent: 81, assistant: 77 },
      { date: "Wed", docReader: 84, agent: 80, assistant: 76 },
      { date: "Thu", docReader: 83, agent: 79, assistant: 75 },
      { date: "Fri", docReader: 84, agent: 80, assistant: 77 },
      { date: "Sat", docReader: 83, agent: 79, assistant: 76 },
      { date: "Sun", docReader: 83, agent: 79, assistant: 76 },
    ],
  },
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const chartConfig = {
  docReader: { label: "AI Doc Reader", color: "hsl(var(--primary))" },
  agent: { label: "AI Agent 2.0", color: "hsl(var(--success))" },
  assistant: { label: "AI Assistant", color: "hsl(var(--accent))" },
};

const TaxonomyDetail = () => {
  const { taxonomyId } = useParams();
  const taxonomy = taxonomiesData[taxonomyId || "finance"];

  if (!taxonomy) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="pl-64">
          <Header />
          <div className="p-6">
            <p className="text-muted-foreground">Taxonomy not found</p>
          </div>
        </main>
      </div>
    );
  }

  const TrendIcon = trendIcons[taxonomy.trend];
  const Icon = taxonomy.icon;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="pl-64">
        <Header />
        
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{taxonomy.name}</span>
          </div>

          {/* Taxonomy Header */}
          <div className="rounded-xl border border-border bg-card p-6 mb-6 shadow-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${taxonomy.iconColor}`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{taxonomy.name}</h1>
                  <p className="text-muted-foreground">{taxonomy.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-4xl font-bold ${
                      taxonomy.score >= 90 ? "text-success" : taxonomy.score >= 70 ? "text-warning" : "text-destructive"
                    }`}>
                      {taxonomy.score}%
                    </span>
                    <TrendIcon className={`h-5 w-5 ${
                      taxonomy.trend === "up" ? "text-success" : taxonomy.trend === "down" ? "text-destructive" : "text-muted-foreground"
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <MetricCard
              title="Total Evaluations"
              value={taxonomy.metrics.totalEvaluations.toLocaleString()}
              change="+12%"
              changeType="positive"
              icon={FileText}
              iconColor="primary"
            />
            <MetricCard
              title="Pass Rate"
              value={`${taxonomy.metrics.passRate}%`}
              change="+2.3%"
              changeType="positive"
              icon={CheckCircle}
              iconColor="success"
            />
            <MetricCard
              title="Avg. Processing Time"
              value={taxonomy.metrics.avgProcessingTime}
              change="-15%"
              changeType="positive"
              icon={Clock}
              iconColor="accent"
            />
            <MetricCard
              title="Time Saved"
              value={taxonomy.metrics.timeSaved}
              change="+5%"
              changeType="positive"
              icon={TrendingUp}
              iconColor="warning"
            />
          </div>

          {/* Performance by AI Capability */}
          <div className="rounded-xl border border-border bg-card p-5 mb-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance by AI Capability</h3>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={taxonomy.performanceData}>
                    <defs>
                      <linearGradient id="docReaderGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="agentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="assistantGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="docReader"
                      stroke="hsl(var(--primary))"
                      fill="url(#docReaderGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="agent"
                      stroke="hsl(var(--success))"
                      fill="url(#agentGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="assistant"
                      stroke="hsl(var(--accent))"
                      fill="url(#assistantGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">AI Doc Reader (IDP)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">AI Agent 2.0</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">AI Assistant</span>
              </div>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {taxonomy.useCases.map((useCase) => (
                <UseCaseCard
                  key={useCase.id}
                  id={useCase.id}
                  taxonomyId={taxonomy.id}
                  {...useCase}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaxonomyDetail;
