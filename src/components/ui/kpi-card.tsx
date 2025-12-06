import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function KPICard({ title, value, icon: Icon, trend, className }: KPICardProps) {
  return (
    <div
      className={cn(
        "inbazz-card p-6 flex items-start justify-between",
        className
      )}
    >
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {trend && (
          <p
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-green-600" : "text-red-500"
            )}
          >
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}% vs mês anterior
          </p>
        )}
      </div>
      <div className="p-3 rounded-xl bg-primary/10">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  );
}
