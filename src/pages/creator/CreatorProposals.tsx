import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockProposals } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Check, MessageCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreatorProposals() {
  const { toast } = useToast();

  const handleAccept = (id: string) => {
    toast({
      title: "Proposta aceita!",
      description: "A proposta foi aceita com sucesso.",
    });
  };

  const handleNegotiate = (id: string) => {
    toast({
      title: "Negociação iniciada",
      description: "Entre em contato para negociar os termos.",
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Proposta recusada",
      description: "A proposta foi recusada.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-status-pending/20 text-status-pending",
      accepted: "bg-status-active/20 text-status-active",
      rejected: "bg-destructive/20 text-destructive",
      negotiating: "bg-status-completed/20 text-status-completed",
    };
    const labels = {
      pending: "Pendente",
      accepted: "Aceita",
      rejected: "Recusada",
      negotiating: "Negociando",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Propostas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas propostas enviadas e recebidas
          </p>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {mockProposals.map((proposal, index) => (
            <div
              key={proposal.id}
              className="inbazz-card inbazz-card-hover p-5 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Avatar & Info */}
                <img
                  src={proposal.creatorAvatar}
                  alt={proposal.creatorName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-border flex-shrink-0"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground">
                      {proposal.creatorName}
                    </h3>
                    {getStatusBadge(proposal.status)}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      proposal.type === "brand"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}>
                      {proposal.type === "brand" ? "Marca" : "Criador"}
                    </span>
                  </div>

                  {proposal.campaignName && (
                    <p className="text-sm text-muted-foreground">
                      Campanha: <span className="font-medium text-foreground">{proposal.campaignName}</span>
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {proposal.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {proposal.proposedValue > 0 && (
                      <span className="font-semibold text-primary">
                        {formatCurrency(proposal.proposedValue)}
                      </span>
                    )}
                    <span className="text-muted-foreground">
                      {formatDate(proposal.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {proposal.status === "pending" && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 border-secondary text-secondary hover:bg-secondary/10"
                      onClick={() => handleNegotiate(proposal.id)}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Negociar
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:border-destructive"
                      onClick={() => handleReject(proposal.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => handleAccept(proposal.id)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {mockProposals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma proposta encontrada.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
