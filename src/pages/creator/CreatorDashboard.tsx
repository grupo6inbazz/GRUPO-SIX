import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/ui/kpi-card";
import { mockCampaigns, mockCreatorStats } from "@/data/mock-data";
import { useNavigate } from "react-router-dom";
import {
  Megaphone,
  Send,
  FileText,
  Handshake,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function CreatorDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe suas propostas e oportunidades
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Campanhas Disponíveis"
            value={mockCreatorStats.totalCampaigns}
            icon={Megaphone}
          />
          <KPICard
            title="Propostas Enviadas"
            value={mockCreatorStats.proposalsSent}
            icon={Send}
            trend={{ value: 20, isPositive: true }}
          />
          <KPICard
            title="Negociações em Andamento"
            value={mockCreatorStats.ongoingNegotiations}
            icon={Handshake}
          />
          <KPICard
            title="Aprovações"
            value={mockCreatorStats.approvals}
            icon={CheckCircle2}
            trend={{ value: 25, isPositive: true }}
          />
        </div>

        {/* Available Campaigns */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Campanhas Disponíveis
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate("/creator/campaigns")}
              className="text-primary"
            >
              Ver todas
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCampaigns
              .filter((c) => c.status === "active")
              .slice(0, 3)
              .map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="inbazz-card inbazz-card-hover p-5 flex flex-col animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                        {campaign.niche}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(campaign.budget)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {campaign.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {campaign.objective}
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
                  <Button
                    className="mt-4 w-full"
                    onClick={() => navigate(`/creator/campaigns/${campaign.id}/apply`)}
                  >
                    Enviar Proposta
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
