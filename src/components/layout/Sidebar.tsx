import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  ChevronDown,
  DollarSign,
  Users,
  ShoppingCart,
  Monitor,
  Scale,
  Settings,
  HelpCircle,
  GitCompare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const taxonomies = [
  { id: "finance", name: "Finance", icon: DollarSign },
  { id: "hr", name: "Human Resources", icon: Users },
  { id: "procurement", name: "Procurement", icon: ShoppingCart },
  { id: "it", name: "IT", icon: Monitor },
  { id: "legal", name: "Legal", icon: Scale },
];

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/", hasSubmenu: false },
  { name: "Taxonomies", icon: Layers, href: null, hasSubmenu: true },
  { name: "Comparison", icon: GitCompare, href: "/comparison", hasSubmenu: false },
];

export function Sidebar() {
  const location = useLocation();
  const [taxonomiesOpen, setTaxonomiesOpen] = useState(true);

  const isActive = (href: string | null) => {
    if (!href) return false;
    return location.pathname === href;
  };

  const isTaxonomyActive = (id: string) => {
    return location.pathname.includes(`/taxonomy/${id}`);
  };

  const isAnyTaxonomyActive = taxonomies.some((t) => isTaxonomyActive(t.id));

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">P</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">AI Evals</h1>
              <p className="text-xs text-muted-foreground">by Pipefy</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => setTaxonomiesOpen(!taxonomiesOpen)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isAnyTaxonomyActive
                        ? "bg-sidebar-accent text-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        taxonomiesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {taxonomiesOpen && (
                    <div className="mt-1 space-y-1 pl-4">
                      {taxonomies.map((taxonomy) => (
                        <Link
                          key={taxonomy.id}
                          to={`/taxonomy/${taxonomy.id}`}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                            isTaxonomyActive(taxonomy.id)
                              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary -ml-[2px] pl-[14px]"
                              : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary border-l-2 border-primary -ml-[2px] pl-[14px]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link
            to="/help"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Link>
        </div>

        {/* User */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
