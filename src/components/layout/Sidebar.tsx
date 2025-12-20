import { 
  LayoutDashboard, 
  ClipboardList, 
  Settings, 
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Monitor,
  Scale,
  ChevronDown,
  ChevronRight,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const taxonomies = [
  { id: "finance", name: "Finance", icon: DollarSign },
  { id: "hr", name: "Human Resources", icon: Users },
  { id: "procurement", name: "Procurement", icon: ShoppingCart },
  { id: "it", name: "IT", icon: Monitor },
  { id: "legal", name: "Legal", icon: Scale },
];

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Taxonomies", icon: Layers, href: null, hasSubmenu: true },
  { name: "Evaluations", icon: ClipboardList, href: "/evaluations" },
  { name: "Analytics", icon: TrendingUp, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [taxonomiesOpen, setTaxonomiesOpen] = useState(true);
  const location = useLocation();

  const isActive = (href: string | null) => {
    if (!href) return false;
    return location.pathname === href;
  };

  const isTaxonomyActive = (id: string) => {
    return location.pathname.startsWith(`/taxonomy/${id}`);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Layers className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">AI Evals</h1>
            <p className="text-xs text-sidebar-foreground/60">by Pipefy</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => setTaxonomiesOpen(!taxonomiesOpen)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      taxonomiesOpen
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </div>
                    {taxonomiesOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {taxonomiesOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                      {taxonomies.map((taxonomy) => (
                        <Link
                          key={taxonomy.id}
                          to={`/taxonomy/${taxonomy.id}`}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                            isTaxonomyActive(taxonomy.id)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                          )}
                        >
                          <taxonomy.icon className="h-4 w-4" />
                          {taxonomy.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href || "/"}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sidebar-primary font-semibold text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
