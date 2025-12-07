import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockProposals, mockCreators } from "@/data/mock-data";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { Check, X, Eye, Users, TrendingUp, Handshake, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ApproveCollabs() {
  const { toast } = useToast();

  // Get creator-to-creator collabs (type: "creator")
  const collabProposals = mockProposals.filter((p) => p.type === "creator");
  const pendingCollabs = collabProposals.filter((p) => p.status === "pending");
  const approvedCollabs = collabProposals.filter((p) => p.status === "accepted");

  const handleApprove = (creatorName: string) => {
    toast({
      title: "Collab aprovada!",
      description: `A colaboração de ${creatorName} foi aprovada.`,
    });
  };

  const handleReject = (creatorName: string) => {
    toast({
      title: "Collab recusada",
      description: `A colaboração de ${creatorName} foi recusada.`,
      variant: "destructive",
    });
  };

  const getCreatorById = (id: string) => {
    return mockCreators.find((c) => c.id === id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Aprovar Collabs</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie colaborações entre criadores nas suas campanhas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Handshake className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold">{pendingCollabs.length}</p>
              </div>
            </div>
          </div>
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aprovadas</p>
                <p className="text-2xl font-bold">{approvedCollabs.length}</p>
              </div>
            </div>
          </div>
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{collabProposals.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              <Handshake className="w-4 h-4" />
              Pendentes ({pendingCollabs.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-2">
              <Check className="w-4 h-4" />
              Aprovadas ({approvedCollabs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6 space-y-4">
            {pendingCollabs.length === 0 ? (
              <div className="inbazz-card p-8 text-center">
                <Handshake className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">Nenhuma collab pendente</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Quando criadores propuserem colaborações, elas aparecerão aqui
                </p>
              </div>
            ) : (
              pendingCollabs.map((collab, index) => {
                const creator = getCreatorById(collab.creatorId);
                return (
                  <div
                    key={collab.id}
                    className="inbazz-card inbazz-card-hover p-6 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      {/* Creator Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <img
                          src={collab.creatorAvatar}
                          alt={collab.creatorName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-border"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-foreground">
                              {collab.creatorName}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                              Collab
                            </span>
                          </div>

                          {creator && (
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{formatNumber(creator.followers)} seguidores</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>{creator.engagementRate}% engajamento</span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                                {creator.niche}
                              </span>
                            </div>
                          )}

                          <p className="text-sm text-muted-foreground">{collab.message}</p>

                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-foreground">Ideia da Collab:</p>
                            <p className="text-sm text-muted-foreground mt-1">{collab.creativeIdea}</p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                              Enviado em {formatDate(collab.createdAt)}
                            </span>
                            <div className="flex gap-1">
                              {collab.deliverables.map((d) => (
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:border-destructive"
                          onClick={() => handleReject(collab.creatorName)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => handleApprove(collab.creatorName)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="approved" className="mt-6 space-y-4">
            {approvedCollabs.length === 0 ? (
              <div className="inbazz-card p-8 text-center">
                <Check className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">Nenhuma collab aprovada</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Collabs aprovadas aparecerão aqui
                </p>
              </div>
            ) : (
              approvedCollabs.map((collab, index) => {
                const creator = getCreatorById(collab.creatorId);
                return (
                  <div
                    key={collab.id}
                    className="inbazz-card p-6 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <img
                        src={collab.creatorAvatar}
                        alt={collab.creatorName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-border"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{collab.creatorName}</h3>
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                            Aprovada
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {collab.creativeIdea}
                        </p>
                        {creator && (
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{formatNumber(creator.followers)} seguidores</span>
                            <span>{creator.niche}</span>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Mensagem
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
