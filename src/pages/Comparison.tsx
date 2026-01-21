import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Monitor, 
  Scale,
  ArrowUp,
  ArrowDown,
  Minus,
  GitCompare,
  X,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaxonomyData {
  id: string;
  name: string;
  icon: LucideIcon;
  score: number;
  trend: number;
  evaluations: number;
  idpAccuracy: number;
  agentAccuracy: number;
  assistantScore: number;
  slaImprovement: number;
  useCases: number;
}

interface UseCaseData {
  id: string;
  name: string;
  taxonomy: string;
  score: number;
  trend: number;
  evaluations: number;
  idpAccuracy: number;
  agentAccuracy: number;
  assistantScore: number;
  slaImprovement: number;
}

const taxonomiesData: TaxonomyData[] = [
  { id: "finance", name: "Finance", icon: DollarSign, score: 92, trend: 3.2, evaluations: 1240, idpAccuracy: 94, agentAccuracy: 91, assistantScore: 88, slaImprovement: 78, useCases: 5 },
  { id: "hr", name: "Human Resources", icon: Users, score: 87, trend: 1.8, evaluations: 890, idpAccuracy: 89, agentAccuracy: 85, assistantScore: 92, slaImprovement: 65, useCases: 4 },
  { id: "procurement", name: "Procurement", icon: ShoppingCart, score: 89, trend: -0.5, evaluations: 756, idpAccuracy: 91, agentAccuracy: 88, assistantScore: 85, slaImprovement: 72, useCases: 4 },
  { id: "it", name: "IT", icon: Monitor, score: 91, trend: 2.1, evaluations: 623, idpAccuracy: 93, agentAccuracy: 90, assistantScore: 87, slaImprovement: 81, useCases: 3 },
  { id: "legal", name: "Legal", icon: Scale, score: 85, trend: 4.5, evaluations: 412, idpAccuracy: 87, agentAccuracy: 82, assistantScore: 90, slaImprovement: 58, useCases: 3 },
];

const useCasesData: UseCaseData[] = [
  { id: "invoice-processing", name: "Invoice Processing", taxonomy: "Finance", score: 94, trend: 2.1, evaluations: 520, idpAccuracy: 96, agentAccuracy: 93, assistantScore: 89, slaImprovement: 85 },
  { id: "expense-claims", name: "Expense Claims", taxonomy: "Finance", score: 91, trend: 1.5, evaluations: 380, idpAccuracy: 93, agentAccuracy: 90, assistantScore: 87, slaImprovement: 72 },
  { id: "credit-analysis", name: "Credit Analysis", taxonomy: "Finance", score: 89, trend: 3.8, evaluations: 210, idpAccuracy: 91, agentAccuracy: 88, assistantScore: 85, slaImprovement: 68 },
  { id: "candidate-screening", name: "Candidate Screening", taxonomy: "HR", score: 88, trend: 2.3, evaluations: 340, idpAccuracy: 90, agentAccuracy: 86, assistantScore: 94, slaImprovement: 70 },
  { id: "employee-onboarding", name: "Employee Onboarding", taxonomy: "HR", score: 86, trend: 1.2, evaluations: 290, idpAccuracy: 88, agentAccuracy: 84, assistantScore: 91, slaImprovement: 62 },
  { id: "vendor-onboarding", name: "Vendor Onboarding", taxonomy: "Procurement", score: 90, trend: -0.8, evaluations: 280, idpAccuracy: 92, agentAccuracy: 89, assistantScore: 86, slaImprovement: 75 },
  { id: "purchase-requests", name: "Purchase Requests", taxonomy: "Procurement", score: 88, trend: 0.5, evaluations: 310, idpAccuracy: 90, agentAccuracy: 87, assistantScore: 84, slaImprovement: 69 },
  { id: "ticket-resolution", name: "Ticket Resolution", taxonomy: "IT", score: 92, trend: 2.8, evaluations: 420, idpAccuracy: 94, agentAccuracy: 91, assistantScore: 88, slaImprovement: 83 },
  { id: "contract-review", name: "Contract Review", taxonomy: "Legal", score: 86, trend: 5.2, evaluations: 180, idpAccuracy: 88, agentAccuracy: 83, assistantScore: 91, slaImprovement: 55 },
];

const TrendIndicator = ({ value }: { value: number }) => {
  if (value > 0) return <span className="flex items-center text-chart-2 text-sm"><ArrowUp className="h-3 w-3" />+{value}%</span>;
  if (value < 0) return <span className="flex items-center text-destructive text-sm"><ArrowDown className="h-3 w-3" />{value}%</span>;
  return <span className="flex items-center text-muted-foreground text-sm"><Minus className="h-3 w-3" />0%</span>;
};

export default function Comparison() {
  const [comparisonType, setComparisonType] = useState<"taxonomies" | "useCases">("taxonomies");
  const [selectedTaxonomies, setSelectedTaxonomies] = useState<string[]>(["finance", "hr"]);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(["invoice-processing", "candidate-screening"]);

  const toggleTaxonomy = (id: string) => {
    setSelectedTaxonomies(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const toggleUseCase = (id: string) => {
    setSelectedUseCases(prev => 
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const selectedTaxonomyData = taxonomiesData.filter(t => selectedTaxonomies.includes(t.id));
  const selectedUseCaseData = useCasesData.filter(u => selectedUseCases.includes(u.id));

  const getBarChartData = () => {
    if (comparisonType === "taxonomies") {
      return selectedTaxonomyData.map(t => ({
        name: t.name,
        "Overall Score": t.score,
        "IDP Accuracy": t.idpAccuracy,
        "Agent Accuracy": t.agentAccuracy,
        "Assistant Score": t.assistantScore,
      }));
    }
    return selectedUseCaseData.map(u => ({
      name: u.name,
      "Overall Score": u.score,
      "IDP Accuracy": u.idpAccuracy,
      "Agent Accuracy": u.agentAccuracy,
      "Assistant Score": u.assistantScore,
    }));
  };

  const getRadarData = () => {
    const metrics = ["IDP", "Agent", "Assistant", "SLA", "Overall"];
    return metrics.map(metric => {
      const dataPoint: Record<string, string | number> = { metric };
      if (comparisonType === "taxonomies") {
        selectedTaxonomyData.forEach(t => {
          switch (metric) {
            case "IDP": dataPoint[t.name] = t.idpAccuracy; break;
            case "Agent": dataPoint[t.name] = t.agentAccuracy; break;
            case "Assistant": dataPoint[t.name] = t.assistantScore; break;
            case "SLA": dataPoint[t.name] = t.slaImprovement; break;
            case "Overall": dataPoint[t.name] = t.score; break;
          }
        });
      } else {
        selectedUseCaseData.forEach(u => {
          switch (metric) {
            case "IDP": dataPoint[u.name] = u.idpAccuracy; break;
            case "Agent": dataPoint[u.name] = u.agentAccuracy; break;
            case "Assistant": dataPoint[u.name] = u.assistantScore; break;
            case "SLA": dataPoint[u.name] = u.slaImprovement; break;
            case "Overall": dataPoint[u.name] = u.score; break;
          }
        });
      }
      return dataPoint;
    });
  };

const colors = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

  // Historical trend data for each item
  const historicalData = [
    { period: "Week 1", finance: 88, hr: 82, procurement: 85, it: 87, legal: 78 },
    { period: "Week 2", finance: 89, hr: 83, procurement: 86, it: 88, legal: 80 },
    { period: "Week 3", finance: 90, hr: 84, procurement: 87, it: 89, legal: 81 },
    { period: "Week 4", finance: 91, hr: 85, procurement: 88, it: 90, legal: 82 },
    { period: "Week 5", finance: 90, hr: 86, procurement: 87, it: 89, legal: 83 },
    { period: "Week 6", finance: 91, hr: 85, procurement: 88, it: 90, legal: 84 },
    { period: "Week 7", finance: 92, hr: 87, procurement: 89, it: 91, legal: 85 },
    { period: "Week 8", finance: 92, hr: 87, procurement: 89, it: 91, legal: 85 },
  ];

  const useCaseHistoricalData = [
    { period: "Week 1", "invoice-processing": 90, "expense-claims": 87, "credit-analysis": 84, "candidate-screening": 83, "employee-onboarding": 82, "vendor-onboarding": 86, "purchase-requests": 84, "ticket-resolution": 88, "contract-review": 79 },
    { period: "Week 2", "invoice-processing": 91, "expense-claims": 88, "credit-analysis": 85, "candidate-screening": 84, "employee-onboarding": 83, "vendor-onboarding": 87, "purchase-requests": 85, "ticket-resolution": 89, "contract-review": 80 },
    { period: "Week 3", "invoice-processing": 92, "expense-claims": 89, "credit-analysis": 86, "candidate-screening": 85, "employee-onboarding": 84, "vendor-onboarding": 88, "purchase-requests": 86, "ticket-resolution": 90, "contract-review": 82 },
    { period: "Week 4", "invoice-processing": 93, "expense-claims": 90, "credit-analysis": 87, "candidate-screening": 86, "employee-onboarding": 85, "vendor-onboarding": 89, "purchase-requests": 87, "ticket-resolution": 91, "contract-review": 83 },
    { period: "Week 5", "invoice-processing": 92, "expense-claims": 89, "credit-analysis": 88, "candidate-screening": 87, "employee-onboarding": 84, "vendor-onboarding": 88, "purchase-requests": 86, "ticket-resolution": 90, "contract-review": 84 },
    { period: "Week 6", "invoice-processing": 93, "expense-claims": 90, "credit-analysis": 88, "candidate-screening": 87, "employee-onboarding": 85, "vendor-onboarding": 89, "purchase-requests": 87, "ticket-resolution": 91, "contract-review": 85 },
    { period: "Week 7", "invoice-processing": 94, "expense-claims": 91, "credit-analysis": 89, "candidate-screening": 88, "employee-onboarding": 86, "vendor-onboarding": 90, "purchase-requests": 88, "ticket-resolution": 92, "contract-review": 86 },
    { period: "Week 8", "invoice-processing": 94, "expense-claims": 91, "credit-analysis": 89, "candidate-screening": 88, "employee-onboarding": 86, "vendor-onboarding": 90, "purchase-requests": 88, "ticket-resolution": 92, "contract-review": 86 },
  ];

  const getHistoricalTrendData = () => {
    if (comparisonType === "taxonomies") {
      return historicalData.map(row => {
        const filtered: Record<string, string | number> = { period: row.period };
        selectedTaxonomyData.forEach(t => {
          filtered[t.name] = row[t.id as keyof typeof row] as number;
        });
        return filtered;
      });
    }
    return useCaseHistoricalData.map(row => {
      const filtered: Record<string, string | number> = { period: row.period };
      selectedUseCaseData.forEach(u => {
        filtered[u.name] = row[u.id as keyof typeof row] as number;
      });
      return filtered;
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <GitCompare className="h-8 w-8 text-primary" />
                  Performance Comparison
                </h1>
                <p className="text-muted-foreground mt-1">
                  Compare metrics across taxonomies or use cases side by side
                </p>
              </div>
            </div>

            {/* Comparison Type Tabs */}
            <Tabs value={comparisonType} onValueChange={(v) => setComparisonType(v as "taxonomies" | "useCases")}>
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="taxonomies">Compare Taxonomies</TabsTrigger>
                <TabsTrigger value="useCases">Compare Use Cases</TabsTrigger>
              </TabsList>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Selection Panel */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Select {comparisonType === "taxonomies" ? "Taxonomies" : "Use Cases"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <TabsContent value="taxonomies" className="m-0 space-y-2">
                      {taxonomiesData.map((taxonomy) => {
                        const Icon = taxonomy.icon;
                        const isSelected = selectedTaxonomies.includes(taxonomy.id);
                        return (
                          <div
                            key={taxonomy.id}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                              isSelected 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-muted-foreground/50"
                            )}
                            onClick={() => toggleTaxonomy(taxonomy.id)}
                          >
                            <Checkbox checked={isSelected} />
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium flex-1">{taxonomy.name}</span>
                            <Badge variant="secondary" className="text-xs">{taxonomy.score}%</Badge>
                          </div>
                        );
                      })}
                    </TabsContent>

                    <TabsContent value="useCases" className="m-0 space-y-2">
                      {useCasesData.map((useCase) => {
                        const isSelected = selectedUseCases.includes(useCase.id);
                        return (
                          <div
                            key={useCase.id}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                              isSelected 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-muted-foreground/50"
                            )}
                            onClick={() => toggleUseCase(useCase.id)}
                          >
                            <Checkbox checked={isSelected} />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium block truncate">{useCase.name}</span>
                              <span className="text-xs text-muted-foreground">{useCase.taxonomy}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">{useCase.score}%</Badge>
                          </div>
                        );
                      })}
                    </TabsContent>
                  </CardContent>
                </Card>

                {/* Comparison Content */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Selected Items */}
                  <div className="flex flex-wrap gap-2">
                    {comparisonType === "taxonomies" ? (
                      selectedTaxonomyData.map((t) => {
                        const Icon = t.icon;
                        return (
                          <Badge key={t.id} variant="outline" className="px-3 py-1.5 gap-2">
                            <Icon className="h-3 w-3" />
                            {t.name}
                            <button onClick={() => toggleTaxonomy(t.id)} className="ml-1 hover:text-destructive">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })
                    ) : (
                      selectedUseCaseData.map((u) => (
                        <Badge key={u.id} variant="outline" className="px-3 py-1.5 gap-2">
                          {u.name}
                          <button onClick={() => toggleUseCase(u.id)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>

                  {/* Metrics Comparison Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Metrics Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Metric</th>
                              {comparisonType === "taxonomies" ? (
                                selectedTaxonomyData.map((t) => (
                                  <th key={t.id} className="text-center py-3 px-4 font-medium">{t.name}</th>
                                ))
                              ) : (
                                selectedUseCaseData.map((u) => (
                                  <th key={u.id} className="text-center py-3 px-4 font-medium">{u.name}</th>
                                ))
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 px-4 text-muted-foreground">Overall Score</td>
                              {(comparisonType === "taxonomies" ? selectedTaxonomyData : selectedUseCaseData).map((item) => (
                                <td key={item.id} className="text-center py-3 px-4">
                                  <div className="flex flex-col items-center gap-1">
                                    <span className="font-semibold text-lg">{item.score}%</span>
                                    <TrendIndicator value={item.trend} />
                                  </div>
                                </td>
                              ))}
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4 text-muted-foreground">IDP Accuracy</td>
                              {(comparisonType === "taxonomies" ? selectedTaxonomyData : selectedUseCaseData).map((item) => (
                                <td key={item.id} className="text-center py-3 px-4 font-medium">{item.idpAccuracy}%</td>
                              ))}
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4 text-muted-foreground">Agent Accuracy</td>
                              {(comparisonType === "taxonomies" ? selectedTaxonomyData : selectedUseCaseData).map((item) => (
                                <td key={item.id} className="text-center py-3 px-4 font-medium">{item.agentAccuracy}%</td>
                              ))}
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4 text-muted-foreground">Assistant Score</td>
                              {(comparisonType === "taxonomies" ? selectedTaxonomyData : selectedUseCaseData).map((item) => (
                                <td key={item.id} className="text-center py-3 px-4 font-medium">{item.assistantScore}%</td>
                              ))}
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4 text-muted-foreground">SLA Improvement</td>
                              {(comparisonType === "taxonomies" ? selectedTaxonomyData : selectedUseCaseData).map((item) => (
                                <td key={item.id} className="text-center py-3 px-4 font-medium">{item.slaImprovement}%</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-4 text-muted-foreground">Evaluations</td>
                              {(comparisonType === "taxonomies" ? selectedTaxonomyData : selectedUseCaseData).map((item) => (
                                <td key={item.id} className="text-center py-3 px-4 font-medium">{item.evaluations.toLocaleString()}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Charts */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Bar Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Score Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getBarChartData()} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                              <YAxis type="category" dataKey="name" width={100} stroke="hsl(var(--muted-foreground))" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: "hsl(var(--card))", 
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px"
                                }} 
                              />
                              <Legend />
                              <Bar dataKey="Overall Score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                              <Bar dataKey="IDP Accuracy" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                              <Bar dataKey="Agent Accuracy" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                              <Bar dataKey="Assistant Score" fill="hsl(var(--chart-4))" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Radar Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Capability Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={getRadarData()}>
                              <PolarGrid stroke="hsl(var(--border))" />
                              <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                              {comparisonType === "taxonomies" ? (
                                selectedTaxonomyData.map((t, index) => (
                                  <Radar
                                    key={t.id}
                                    name={t.name}
                                    dataKey={t.name}
                                    stroke={colors[index % colors.length]}
                                    fill={colors[index % colors.length]}
                                    fillOpacity={0.2}
                                  />
                                ))
                              ) : (
                                selectedUseCaseData.map((u, index) => (
                                  <Radar
                                    key={u.id}
                                    name={u.name}
                                    dataKey={u.name}
                                    stroke={colors[index % colors.length]}
                                    fill={colors[index % colors.length]}
                                    fillOpacity={0.2}
                                  />
                                ))
                              )}
                              <Legend />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: "hsl(var(--card))", 
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px"
                                }} 
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Historical Trend Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Historical Performance Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={getHistoricalTrendData()}>
                            <defs>
                              {(comparisonType === "taxonomies" ? selectedTaxonomyData : selectedUseCaseData).map((item, index) => (
                                <linearGradient key={item.id} id={`gradient-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.3} />
                                  <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0} />
                                </linearGradient>
                              ))}
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis 
                              dataKey="period" 
                              stroke="hsl(var(--muted-foreground))" 
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis 
                              domain={[70, 100]} 
                              stroke="hsl(var(--muted-foreground))" 
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: "hsl(var(--card))", 
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px"
                              }} 
                            />
                            <Legend />
                            {comparisonType === "taxonomies" ? (
                              selectedTaxonomyData.map((t, index) => (
                                <Area
                                  key={t.id}
                                  type="monotone"
                                  dataKey={t.name}
                                  stroke={colors[index % colors.length]}
                                  strokeWidth={2}
                                  fill={`url(#gradient-${t.id})`}
                                />
                              ))
                            ) : (
                              selectedUseCaseData.map((u, index) => (
                                <Area
                                  key={u.id}
                                  type="monotone"
                                  dataKey={u.name}
                                  stroke={colors[index % colors.length]}
                                  strokeWidth={2}
                                  fill={`url(#gradient-${u.id})`}
                                />
                              ))
                            )}
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
