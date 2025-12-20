import { Layers, ClipboardCheck, TrendingUp, Clock, DollarSign, Users, ShoppingCart, Monitor, Scale } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TaxonomyCard } from "@/components/dashboard/TaxonomyCard";
import { EvaluationTable } from "@/components/dashboard/EvaluationTable";
import { ScoreChart } from "@/components/dashboard/ScoreChart";
import { TaxonomyFilter } from "@/components/dashboard/TaxonomyFilter";

const metrics = [
  { title: "Total Use Cases", value: "18", change: "+2", changeType: "positive" as const, icon: Layers, iconColor: "primary" as const },
  { title: "Evaluations Today", value: "2,450", change: "+18%", changeType: "positive" as const, icon: ClipboardCheck, iconColor: "success" as const },
  { title: "Avg. IDP Accuracy", value: "91%", change: "+2.4%", changeType: "positive" as const, icon: TrendingUp, iconColor: "accent" as const },
  { title: "Time Saved", value: "89%", change: "+5%", changeType: "positive" as const, icon: Clock, iconColor: "warning" as const },
];

const taxonomies = [
  { id: "finance", name: "Finance", icon: DollarSign, score: 92, trend: "up" as const, useCasesCount: 4, evaluationsToday: 45, topUseCase: "Invoice Processing", iconColor: "bg-emerald-500" },
  { id: "hr", name: "Human Resources", icon: Users, score: 87, trend: "up" as const, useCasesCount: 4, evaluationsToday: 32, topUseCase: "Leave Requests", iconColor: "bg-blue-500" },
  { id: "procurement", name: "Procurement", icon: ShoppingCart, score: 85, trend: "stable" as const, useCasesCount: 3, evaluationsToday: 28, topUseCase: "Purchase Orders", iconColor: "bg-purple-500" },
  { id: "it", name: "IT", icon: Monitor, score: 90, trend: "up" as const, useCasesCount: 3, evaluationsToday: 51, topUseCase: "Ticket Triage", iconColor: "bg-cyan-500" },
  { id: "legal", name: "Legal", icon: Scale, score: 83, trend: "down" as const, useCasesCount: 3, evaluationsToday: 20, topUseCase: "Contract Analysis", iconColor: "bg-amber-500" },
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
            
            {/* Taxonomy Filter */}
            <TaxonomyFilter />
          </div>

          {/* Taxonomy Cards */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Performance by Taxonomy</h3>
                <p className="text-sm text-muted-foreground">Monitor AI capabilities across Pipefy use cases</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {taxonomies.map((taxonomy, index) => (
                <div key={taxonomy.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <TaxonomyCard {...taxonomy} />
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
