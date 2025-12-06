import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/ui/kpi-card";
import { StatusChip } from "@/components/ui/status-chip";
import { mockCampaigns, mockBrandStats } from "@/data/mock-data";
import { useNavigate } from "react-router-dom";
import {
  Megaphone,
  FileText,
  Handshake,
  CheckCircle2,
  Users,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function BrandDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Visão geral das suas campanhas e propostas
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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total de Campanhas"
            value={mockBrandStats.totalCampaigns}
            icon={Megaphone}
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="Propostas Recebidas"
            value={mockBrandStats.proposalsReceived}
            icon={FileText}
            trend={{ value: 8, isPositive: true }}
          />
          <KPICard
            title="Negociações em Andamento"
            value={mockBrandStats.ongoingNegotiations}
            icon={Handshake}
          />
          <KPICard
            title="Criadores Aprovados"
            value={mockBrandStats.approvals}
            icon={CheckCircle2}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Recent Campaigns */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Campanhas Recentes
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate("/brand/campaigns")}
              className="text-primary"
            >
              Ver todas
            </Button>
          </div>

          <div className="grid gap-4">
            {mockCampaigns.slice(0, 3).map((campaign, index) => (
              <div
                key={campaign.id}
                className="inbazz-card inbazz-card-hover p-5 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">
                        {campaign.name}
                      </h3>
                      <StatusChip status={campaign.status} />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {campaign.objective}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground">Orçamento</p>
                      <p className="font-semibold text-foreground">
                        {formatCurrency(campaign.remainingBudget)} / {formatCurrency(campaign.budget)}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Criadores</span>
                      </div>
                      <p className="font-semibold text-foreground">
                        {campaign.approvedCreators}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
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
      </div>
    </DashboardLayout>
  );
}
