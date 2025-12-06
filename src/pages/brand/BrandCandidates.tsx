import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockCreators } from "@/data/mock-data";
import { formatNumber } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BrandCandidates() {
  const { toast } = useToast();

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidatos</h1>
          <p className="text-muted-foreground mt-1">
            Avalie criadores que se candidataram às suas campanhas
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="grid gap-4">
          {mockCreators.map((creator, index) => (
            <div
              key={creator.id}
              className="inbazz-card inbazz-card-hover p-5 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Avatar & Info */}
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-border"
                />

                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-foreground">{creator.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {creator.bio}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none gap-1 border-secondary text-secondary hover:bg-secondary/10"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Proposta
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive hover:border-destructive"
                    onClick={() => handleReject(creator.name)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleApprove(creator.name)}
                  >
                    <Check className="w-4 h-4" />
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
