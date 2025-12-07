import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockProposals } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { Check, X, Eye, MessageSquare, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BrandProposals() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get proposals sent to the brand (type: "brand")
  const brandProposals = mockProposals.filter((p) => p.type === "brand");
  
  const filteredProposals = statusFilter === "all" 
    ? brandProposals 
    : brandProposals.filter((p) => p.status === statusFilter);

  const handleApprove = (name: string) => {
    toast({
      title: "Proposta aceita!",
      description: `A proposta de ${name} foi aceita.`,
    });
  };

  const handleReject = (name: string) => {
    toast({
      title: "Proposta recusada",
      description: `A proposta de ${name} foi recusada.`,
      variant: "destructive",
    });
  };

  const handleNegotiate = (name: string) => {
    toast({
      title: "Negociação iniciada",
      description: `Você iniciou uma negociação com ${name}.`,
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pendente";
      case "accepted": return "Aceita";
      case "rejected": return "Recusada";
      case "negotiating": return "Negociando";
      default: return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Propostas de Criadores</h1>
            <p className="text-muted-foreground mt-1">
              Veja e gerencie todas as propostas recebidas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="negotiating">Negociando</SelectItem>
                <SelectItem value="accepted">Aceitas</SelectItem>
                <SelectItem value="rejected">Recusadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.length === 0 ? (
            <div className="inbazz-card p-8 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground">Nenhuma proposta encontrada</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {statusFilter !== "all" 
                  ? "Tente mudar o filtro para ver outras propostas" 
                  : "Aguarde os criadores enviarem propostas para suas campanhas"}
              </p>
            </div>
          ) : (
            filteredProposals.map((proposal, index) => (
              <div
                key={proposal.id}
                className="inbazz-card inbazz-card-hover p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row items-start gap-4">
                  {/* Creator Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={proposal.creatorAvatar}
                      alt={proposal.creatorName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-lg text-foreground">
                          {proposal.creatorName}
                        </h3>
                        <StatusChip 
                          status={
                            proposal.status === "pending" ? "draft" : 
                            proposal.status === "negotiating" ? "active" : 
                            proposal.status === "accepted" ? "completed" : "draft"
                          } 
                        />
                        <span className="text-sm text-muted-foreground">
                          {getStatusLabel(proposal.status)}
                        </span>
                      </div>
                      
                      {proposal.campaignName && (
                        <p className="text-sm text-primary font-medium">
                          Campanha: {proposal.campaignName}
                        </p>
                      )}
                      
                      <p className="text-sm text-muted-foreground">{proposal.message}</p>
                      
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-foreground">Ideia Criativa:</p>
                        <p className="text-sm text-muted-foreground mt-1">{proposal.creativeIdea}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="font-semibold text-foreground">
                          Valor: {formatCurrency(proposal.proposedValue)}
                        </span>
                        <span className="text-muted-foreground">
                          Enviado em {formatDate(proposal.createdAt)}
                        </span>
                        <div className="flex gap-1">
                          {proposal.deliverables.map((d) => (
                            <span key={d} className="px-2 py-0.5 bg-muted rounded-md text-xs capitalize">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    {proposal.portfolioUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 lg:flex-none gap-1"
                        onClick={() => window.open(proposal.portfolioUrl, "_blank")}
                      >
                        <Eye className="w-4 h-4" />
                        Portfólio
                      </Button>
                    )}
                    {proposal.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none gap-1 border-secondary text-secondary hover:bg-secondary/10"
                          onClick={() => handleNegotiate(proposal.creatorName)}
                        >
                          Negociar
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:border-destructive"
                          onClick={() => handleReject(proposal.creatorName)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => handleApprove(proposal.creatorName)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {proposal.status === "negotiating" && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:border-destructive"
                          onClick={() => handleReject(proposal.creatorName)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => handleApprove(proposal.creatorName)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
