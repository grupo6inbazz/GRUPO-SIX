import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { mockCampaigns, mockProposals, mockCreators } from "@/data/mock-data";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Users, 
  Target, 
  Edit, 
  Trash2,
  Check,
  X,
  Eye,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CampaignManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const campaign = mockCampaigns.find((c) => c.id === id);
  const campaignProposals = mockProposals.filter((p) => p.campaignId === id);

  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Campanha não encontrada</h2>
          <Button onClick={() => navigate("/brand/campaigns")}>
            Voltar para campanhas
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleApprove = (name: string) => {
    toast({
      title: "Criador aprovado!",
      description: `${name} foi aprovado para a campanha.`,
    });
  };

  const handleReject = (name: string) => {
    toast({
      title: "Criador recusado",
      description: `${name} foi recusado.`,
      variant: "destructive",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Campanha excluída",
      description: "A campanha foi removida com sucesso.",
      variant: "destructive",
    });
    navigate("/brand/campaigns");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/brand/campaigns")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{campaign.name}</h1>
                <StatusChip status={campaign.status} />
              </div>
              <p className="text-muted-foreground mt-1">{campaign.objective}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            <Button variant="destructive" className="gap-2" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
              Excluir
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Orçamento Total</p>
                <p className="text-lg font-semibold">{formatCurrency(campaign.budget)}</p>
              </div>
            </div>
          </div>
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <DollarSign className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Orçamento Restante</p>
                <p className="text-lg font-semibold">{formatCurrency(campaign.remainingBudget)}</p>
              </div>
            </div>
          </div>
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Criadores Aprovados</p>
                <p className="text-lg font-semibold">{campaign.approvedCreators}</p>
              </div>
            </div>
          </div>
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Calendar className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prazo</p>
                <p className="text-lg font-semibold">{formatDate(campaign.deadline)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="proposals" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Propostas ({campaignProposals.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-2">
              <Check className="w-4 h-4" />
              Aprovados ({campaign.approvedCreators})
            </TabsTrigger>
            <TabsTrigger value="details" className="gap-2">
              <Target className="w-4 h-4" />
              Detalhes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="mt-6 space-y-4">
            {campaignProposals.length === 0 ? (
              <div className="inbazz-card p-8 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">Nenhuma proposta ainda</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Aguarde os criadores enviarem suas propostas
                </p>
              </div>
            ) : (
              campaignProposals.map((proposal, index) => (
                <div
                  key={proposal.id}
                  className="inbazz-card inbazz-card-hover p-5 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <img
                      src={proposal.creatorAvatar}
                      alt={proposal.creatorName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-border"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{proposal.creatorName}</h3>
                        <StatusChip 
                          status={proposal.status === "pending" ? "draft" : proposal.status === "negotiating" ? "active" : "completed"} 
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{proposal.message}</p>
                      <p className="text-sm"><strong>Ideia:</strong> {proposal.creativeIdea}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Valor: <strong className="text-foreground">{formatCurrency(proposal.proposedValue)}</strong></span>
                        <span>Enviado em {formatDate(proposal.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none gap-1"
                        onClick={() => navigate(`/brand/proposals/${proposal.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                        Ver
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
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="mt-6 space-y-4">
            {mockCreators.slice(0, campaign.approvedCreators).map((creator, index) => (
              <div
                key={creator.id}
                className="inbazz-card p-5 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-border"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground">{creator.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{formatNumber(creator.followers)} seguidores</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{creator.engagementRate}% engajamento</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      Aprovado
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <div className="inbazz-card p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Nome da Campanha</label>
                    <p className="font-medium text-foreground">{campaign.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Objetivo</label>
                    <p className="font-medium text-foreground">{campaign.objective}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Nicho</label>
                    <p className="font-medium text-foreground">{campaign.niche}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Tipo de Pagamento</label>
                    <p className="font-medium text-foreground capitalize">
                      {campaign.paymentType === "fixed" ? "Fixo" : campaign.paymentType === "barter" ? "Permuta" : `Comissão (${campaign.commissionPercentage}%)`}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Entregáveis</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {campaign.deliverables.map((d) => (
                        <span key={d} className="px-2 py-1 bg-muted rounded-md text-sm capitalize">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Data de Criação</label>
                    <p className="font-medium text-foreground">{formatDate(campaign.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
