import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusChip } from "@/components/ui/status-chip";
import { mockCampaigns } from "@/data/mock-data";
import { useNavigate } from "react-router-dom";
import { Plus, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/format";

export default function BrandCampaigns() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Campanhas</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todas as suas campanhas
            </p>
          </div>
          <Button
            onClick={() => navigate("/brand/campaigns/new")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Criar Campanha
          </Button>
        </div>

        {/* Campaign Grid */}
        <div className="grid gap-4">
          {mockCampaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className="inbazz-card inbazz-card-hover p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground">
                      {campaign.name}
                    </h3>
                    <StatusChip status={campaign.status} />
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {campaign.niche}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {campaign.objective}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Prazo: {formatDate(campaign.deadline)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {campaign.approvedCreators} aprovados / {campaign.totalCandidates} candidatos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-muted-foreground">Orçamento restante</p>
                    <p className="text-lg font-bold text-foreground">
                      {formatCurrency(campaign.remainingBudget)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      de {formatCurrency(campaign.budget)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/brand/campaigns/${campaign.id}`)}
                  >
                    Gerenciar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
