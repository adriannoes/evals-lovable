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
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Play
} from "lucide-react";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RunEvaluationModal } from "@/components/evaluation/RunEvaluationModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data - in real app this would come from API based on taxonomyId and useCaseId
const useCaseData = {
  "invoice-processing": {
    id: "invoice-processing",
    name: "Invoice Processing",
    taxonomyId: "finance",
    taxonomyName: "Finance",
    description: "Automated processing and validation of vendor invoices",
    score: 94,
    trend: "up" as const,
    metrics: {
      totalEvaluations: 1250,
      passRate: 94,
      avgProcessingTime: "2.3 min",
      timeSaved: "94%",
    },
    extractionAccuracy: [
      { field: "Vendor Name", accuracy: 98, samples: 1250 },
      { field: "Invoice Number", accuracy: 97, samples: 1250 },
      { field: "Invoice Date", accuracy: 99, samples: 1250 },
      { field: "Line Items", accuracy: 89, samples: 1180 },
      { field: "Total Amount", accuracy: 99, samples: 1250 },
      { field: "Tax Amount", accuracy: 95, samples: 980 },
      { field: "Payment Terms", accuracy: 92, samples: 1100 },
      { field: "PO Number", accuracy: 88, samples: 920 },
    ],
    decisionMatrix: {
      correctApprovals: 892,
      correctRejections: 156,
      falseApprovals: 18,
      falseRejections: 12,
      routedToHuman: 172,
    },
    slaImpact: {
      beforeAutomation: "45 min",
      afterAutomation: "2.3 min",
      improvement: "94%",
    },
    performanceData: [
      { date: "Mon", docReader: 93, agent: 91, assistant: 86 },
      { date: "Tue", docReader: 94, agent: 92, assistant: 87 },
      { date: "Wed", docReader: 93, agent: 91, assistant: 88 },
      { date: "Thu", docReader: 95, agent: 93, assistant: 89 },
      { date: "Fri", docReader: 96, agent: 94, assistant: 90 },
      { date: "Sat", docReader: 96, agent: 94, assistant: 90 },
      { date: "Sun", docReader: 97, agent: 95, assistant: 91 },
    ],
    recentEvaluations: [
      { 
        id: "eval-001", 
        timestamp: "2 min ago", 
        status: "pass", 
        extractionScore: 98, 
        decisionScore: 100,
        input: { vendorName: "Acme Corp", invoiceNumber: "INV-2024-001", amount: "$15,420.00" },
        output: { extractedVendor: "Acme Corp", extractedNumber: "INV-2024-001", extractedAmount: "$15,420.00" },
        decision: "Auto-approved",
        expectedDecision: "Auto-approved",
      },
      { 
        id: "eval-002", 
        timestamp: "5 min ago", 
        status: "pass", 
        extractionScore: 95, 
        decisionScore: 100,
        input: { vendorName: "TechSupply Inc", invoiceNumber: "TS-99821", amount: "$8,750.00" },
        output: { extractedVendor: "TechSupply Inc", extractedNumber: "TS-99821", extractedAmount: "$8,750.00" },
        decision: "Routed to Manager",
        expectedDecision: "Routed to Manager",
      },
      { 
        id: "eval-003", 
        timestamp: "12 min ago", 
        status: "fail", 
        extractionScore: 72, 
        decisionScore: 0,
        input: { vendorName: "Global Services LLC", invoiceNumber: "GS/2024/0042", amount: "€12,500.00" },
        output: { extractedVendor: "Global Services", extractedNumber: "GS/2024/42", extractedAmount: "$12,500.00" },
        decision: "Auto-approved",
        expectedDecision: "Routed to Finance",
      },
      { 
        id: "eval-004", 
        timestamp: "18 min ago", 
        status: "pass", 
        extractionScore: 100, 
        decisionScore: 100,
        input: { vendorName: "Office Depot", invoiceNumber: "OD-445566", amount: "$342.50" },
        output: { extractedVendor: "Office Depot", extractedNumber: "OD-445566", extractedAmount: "$342.50" },
        decision: "Auto-approved",
        expectedDecision: "Auto-approved",
      },
      { 
        id: "eval-005", 
        timestamp: "25 min ago", 
        status: "warning", 
        extractionScore: 85, 
        decisionScore: 100,
        input: { vendorName: "Consulting Partners", invoiceNumber: "CP-2024-156", amount: "$28,900.00" },
        output: { extractedVendor: "Consulting Partner", extractedNumber: "CP-2024-156", extractedAmount: "$28,900.00" },
        decision: "Routed to CFO",
        expectedDecision: "Routed to CFO",
      },
    ],
  },
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const statusConfig = {
  pass: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  fail: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
};

const chartConfig = {
  docReader: { label: "AI Doc Reader", color: "hsl(var(--primary))" },
  agent: { label: "AI Agent 2.0", color: "hsl(var(--success))" },
  assistant: { label: "AI Assistant", color: "hsl(var(--accent))" },
};

const COLORS = ["hsl(var(--success))", "hsl(var(--success))", "hsl(var(--destructive))", "hsl(var(--warning))", "hsl(var(--muted))"];

const UseCaseDetail = () => {
  const { taxonomyId, useCaseId } = useParams();
  const [expandedEval, setExpandedEval] = useState<string | null>(null);

  // Get use case data - in real app this would be fetched
  const useCase = useCaseData["invoice-processing"];

  if (!useCase) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="pl-64">
          <Header />
          <div className="p-6">
            <p className="text-muted-foreground">Use case not found</p>
          </div>
        </main>
      </div>
    );
  }

  const TrendIcon = trendIcons[useCase.trend];

  const decisionPieData = [
    { name: "Correct Approvals", value: useCase.decisionMatrix.correctApprovals },
    { name: "Correct Rejections", value: useCase.decisionMatrix.correctRejections },
    { name: "False Approvals", value: useCase.decisionMatrix.falseApprovals },
    { name: "False Rejections", value: useCase.decisionMatrix.falseRejections },
    { name: "Routed to Human", value: useCase.decisionMatrix.routedToHuman },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="pl-64">
        <Header />
        
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <Link to={`/taxonomy/${taxonomyId}`} className="hover:text-foreground transition-colors">
              {useCase.taxonomyName}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{useCase.name}</span>
          </div>

          {/* Use Case Header */}
          <div className="rounded-xl border border-border bg-card p-6 mb-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <Link 
                  to={`/taxonomy/${taxonomyId}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1 mb-2"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to {useCase.taxonomyName}
                </Link>
                <h1 className="text-2xl font-bold text-foreground">{useCase.name}</h1>
                <p className="text-muted-foreground">{useCase.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <RunEvaluationModal
                  defaultTaxonomy={taxonomyId}
                  defaultUseCase={useCase.name}
                  trigger={
                    <Button className="gap-2">
                      <Play className="h-4 w-4" />
                      Run Evaluation
                    </Button>
                  }
                />
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-4xl font-bold ${
                      useCase.score >= 90 ? "text-success" : useCase.score >= 70 ? "text-warning" : "text-destructive"
                    }`}>
                      {useCase.score}%
                    </span>
                    <TrendIcon className={`h-5 w-5 ${
                      useCase.trend === "up" ? "text-success" : useCase.trend === "down" ? "text-destructive" : "text-muted-foreground"
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
              value={useCase.metrics.totalEvaluations.toLocaleString()}
              change="+8%"
              changeType="positive"
              icon={FileText}
              iconColor="primary"
            />
            <MetricCard
              title="Pass Rate"
              value={`${useCase.metrics.passRate}%`}
              change="+1.2%"
              changeType="positive"
              icon={CheckCircle}
              iconColor="success"
            />
            <MetricCard
              title="Avg. Processing Time"
              value={useCase.metrics.avgProcessingTime}
              change="-20%"
              changeType="positive"
              icon={Clock}
              iconColor="accent"
            />
            <MetricCard
              title="Time Saved"
              value={useCase.metrics.timeSaved}
              change="+3%"
              changeType="positive"
              icon={TrendingUp}
              iconColor="warning"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Extraction Accuracy */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Extraction Accuracy (IDP)</h3>
              </div>
              <div className="space-y-3">
                {useCase.extractionAccuracy.map((field) => (
                  <div key={field.field} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">{field.field}</span>
                        <span className={cn(
                          "text-sm font-semibold",
                          field.accuracy >= 95 ? "text-success" : field.accuracy >= 85 ? "text-warning" : "text-destructive"
                        )}>
                          {field.accuracy}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            field.accuracy >= 95 ? "bg-success" : field.accuracy >= 85 ? "bg-warning" : "bg-destructive"
                          )}
                          style={{ width: `${field.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Matrix */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-success" />
                <h3 className="text-lg font-semibold text-foreground">Decision Correctness (Agent 2.0)</h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={decisionPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {decisionPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success" />
                      <span className="text-muted-foreground">Correct Decisions</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {useCase.decisionMatrix.correctApprovals + useCase.decisionMatrix.correctRejections}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Incorrect Decisions</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {useCase.decisionMatrix.falseApprovals + useCase.decisionMatrix.falseRejections}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">Routed to Human</span>
                    </div>
                    <span className="font-semibold text-foreground">{useCase.decisionMatrix.routedToHuman}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Decision Accuracy</span>
                  <span className="text-lg font-bold text-success">
                    {Math.round(((useCase.decisionMatrix.correctApprovals + useCase.decisionMatrix.correctRejections) / 
                      (useCase.decisionMatrix.correctApprovals + useCase.decisionMatrix.correctRejections + 
                       useCase.decisionMatrix.falseApprovals + useCase.decisionMatrix.falseRejections)) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SLA Impact */}
          <div className="rounded-xl border border-border bg-card p-5 mb-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">SLA Impact</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Before Automation</p>
                <p className="text-2xl font-bold text-foreground">{useCase.slaImpact.beforeAutomation}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">After Automation</p>
                <p className="text-2xl font-bold text-primary">{useCase.slaImpact.afterAutomation}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-success/10">
                <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
                <p className="text-2xl font-bold text-success">{useCase.slaImpact.improvement}</p>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="rounded-xl border border-border bg-card p-5 mb-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance Over Time</h3>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={useCase.performanceData}>
                    <defs>
                      <linearGradient id="ucDocReaderGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="ucAgentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="ucAssistantGradient" x1="0" y1="0" x2="0" y2="1">
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
                      fill="url(#ucDocReaderGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="agent"
                      stroke="hsl(var(--success))"
                      fill="url(#ucAgentGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="assistant"
                      stroke="hsl(var(--accent))"
                      fill="url(#ucAssistantGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Recent Evaluations with Drill-down */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Recent Evaluations</h3>
              <p className="text-sm text-muted-foreground">Click to expand and view details</p>
            </div>
            <div className="divide-y divide-border">
              {useCase.recentEvaluations.map((evaluation) => {
                const StatusIcon = statusConfig[evaluation.status].icon;
                const isExpanded = expandedEval === evaluation.id;

                return (
                  <div key={evaluation.id}>
                    <button
                      onClick={() => setExpandedEval(isExpanded ? null : evaluation.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div className={cn("p-2 rounded-lg", statusConfig[evaluation.status].bg)}>
                          <StatusIcon className={cn("h-4 w-4", statusConfig[evaluation.status].color)} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">{evaluation.id}</p>
                          <p className="text-xs text-muted-foreground">{evaluation.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Extraction</p>
                          <p className={cn(
                            "text-sm font-semibold",
                            evaluation.extractionScore >= 90 ? "text-success" : evaluation.extractionScore >= 70 ? "text-warning" : "text-destructive"
                          )}>
                            {evaluation.extractionScore}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Decision</p>
                          <p className={cn(
                            "text-sm font-semibold",
                            evaluation.decisionScore >= 90 ? "text-success" : evaluation.decisionScore >= 70 ? "text-warning" : "text-destructive"
                          )}>
                            {evaluation.decisionScore}%
                          </p>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-12 pb-4 bg-muted/10">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Input Document</h4>
                            <div className="space-y-2 text-sm">
                              {Object.entries(evaluation.input).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                  <span className="font-mono text-foreground">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Extracted Output</h4>
                            <div className="space-y-2 text-sm">
                              {Object.entries(evaluation.output).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-muted-foreground capitalize">{key.replace(/extracted/i, '').replace(/([A-Z])/g, ' $1')}</span>
                                  <span className="font-mono text-foreground">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 rounded-lg bg-card border border-border">
                          <h4 className="text-sm font-semibold text-foreground mb-3">Decision Analysis</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">AI Decision</span>
                              <span className={cn(
                                "font-medium",
                                evaluation.decision === evaluation.expectedDecision ? "text-success" : "text-destructive"
                              )}>
                                {evaluation.decision}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Expected Decision</span>
                              <span className="font-medium text-foreground">{evaluation.expectedDecision}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCaseDetail;
