import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockCampaigns } from "@/data/mock-data";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/format";
import { Calendar, DollarSign } from "lucide-react";

export default function CreatorCampaigns() {
  const navigate = useNavigate();

  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Campanhas Disponíveis
          </h1>
          <p className="text-muted-foreground mt-1">
            Encontre campanhas que combinam com seu perfil
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeCampaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className="inbazz-card inbazz-card-hover p-6 flex flex-col animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {campaign.niche}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {campaign.objective}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-primary">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-xl font-bold">
                    {formatCurrency(campaign.budget)}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Entregáveis esperados
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {campaign.deliverables.map((d) => (
                      <span
                        key={d}
                        className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs capitalize"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Prazo: {formatDate(campaign.deadline)}</span>
                </div>
              </div>

              <Button
                className="mt-6 w-full"
                onClick={() => navigate(`/creator/campaigns/${campaign.id}/apply`)}
              >
                Enviar Proposta
              </Button>
            </div>
          ))}
        </div>

        {activeCampaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma campanha disponível no momento.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
