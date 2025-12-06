import { cn } from "@/lib/utils";

type StatusType = "draft" | "active" | "completed" | "pending";

interface StatusChipProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  draft: {
    label: "Rascunho",
    className: "bg-status-draft/20 text-muted-foreground",
  },
  active: {
    label: "Ativa",
    className: "bg-status-active/20 text-status-active",
  },
  completed: {
    label: "Finalizada",
    className: "bg-status-completed/20 text-status-completed",
  },
  pending: {
    label: "Pendente",
    className: "bg-status-pending/20 text-status-pending",
  },
};

export function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
