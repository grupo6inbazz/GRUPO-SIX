import { useUser } from "@/contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Megaphone,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const brandNavItems = [
  { icon: Home, label: "Dashboard", path: "/brand/dashboard" },
  { icon: Megaphone, label: "Campanhas", path: "/brand/campaigns" },
  { icon: FileText, label: "Candidatos", path: "/brand/candidates" },
  { icon: User, label: "Perfil", path: "/brand/profile" },
];

const creatorNavItems = [
  { icon: Home, label: "Dashboard", path: "/creator/dashboard" },
  { icon: Megaphone, label: "Campanhas", path: "/creator/campaigns" },
  { icon: FileText, label: "Propostas", path: "/creator/proposals" },
  { icon: User, label: "Perfil", path: "/creator/profile" },
];

export function AppSidebar() {
  const { userType, setUserType } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = userType === "brand" ? brandNavItems : creatorNavItems;

  const handleLogout = () => {
    setUserType(null);
    navigate("/");
  };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold inbazz-gradient-text">Inbazz</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            "text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
