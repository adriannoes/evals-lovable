import { Layers, Check, DollarSign, Users, ShoppingCart, Monitor, Scale, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Taxonomy {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

const taxonomies: Taxonomy[] = [
  { id: "all", name: "All Taxonomies", icon: Layers, count: 156 },
  { id: "finance", name: "Finance", icon: DollarSign, count: 45 },
  { id: "hr", name: "Human Resources", icon: Users, count: 32 },
  { id: "procurement", name: "Procurement", icon: ShoppingCart, count: 28 },
  { id: "it", name: "IT", icon: Monitor, count: 31 },
  { id: "legal", name: "Legal", icon: Scale, count: 20 },
];

interface TaxonomyFilterProps {
  onFilterChange?: (taxonomyId: string) => void;
}

export function TaxonomyFilter({ onFilterChange }: TaxonomyFilterProps) {
  const [selected, setSelected] = useState("all");

  const handleSelect = (id: string) => {
    setSelected(id);
    onFilterChange?.(id);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Filter by Taxonomy</h3>
      </div>

      <div className="space-y-1">
        {taxonomies.map((taxonomy) => {
          const Icon = taxonomy.icon;
          return (
            <button
              key={taxonomy.id}
              onClick={() => handleSelect(taxonomy.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                selected === taxonomy.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{taxonomy.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  selected === taxonomy.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {taxonomy.count}
                </span>
                {selected === taxonomy.id && <Check className="h-4 w-4" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
