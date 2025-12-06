import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { mockCampaigns } from "@/data/mock-data";
import { DeliverableType } from "@/types";

const deliverableOptions: { id: DeliverableType; label: string }[] = [
  { id: "reels", label: "Reels" },
  { id: "stories", label: "Stories" },
  { id: "tiktok", label: "TikTok" },
  { id: "shorts", label: "Shorts" },
  { id: "photo", label: "Foto" },
  { id: "others", label: "Outros" },
];

export default function SendProposal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const campaign = mockCampaigns.find((c) => c.id === id);

  const [message, setMessage] = useState("");
  const [creativeIdea, setCreativeIdea] = useState("");
  const [deliverables, setDeliverables] = useState<DeliverableType[]>([]);
  const [proposedValue, setProposedValue] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const handleDeliverableChange = (deliverable: DeliverableType, checked: boolean) => {
    if (checked) {
      setDeliverables([...deliverables, deliverable]);
    } else {
      setDeliverables(deliverables.filter((d) => d !== deliverable));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Proposta enviada!",
      description: "Sua proposta foi enviada com sucesso.",
    });
    navigate("/creator/proposals");
  };

  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Campanha não encontrada.</p>
          <Button
            variant="ghost"
            onClick={() => navigate("/creator/campaigns")}
            className="mt-4"
          >
            Voltar para campanhas
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/creator/campaigns")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Enviar Proposta</h1>
            <p className="text-muted-foreground mt-1">{campaign.name}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Card */}
          <div className="inbazz-card p-6 space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground">
              Sua Proposta
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem personalizada</Label>
                <Textarea
                  id="message"
                  placeholder="Apresente-se e explique por que você é ideal para esta campanha..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creativeIdea">Ideia criativa para a campanha</Label>
                <Textarea
                  id="creativeIdea"
                  placeholder="Descreva sua ideia criativa, formato do conteúdo, abordagem..."
                  value={creativeIdea}
                  onChange={(e) => setCreativeIdea(e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Deliverables Card */}
          <div className="inbazz-card p-6 space-y-6 animate-fade-in [animation-delay:100ms]">
            <h2 className="text-lg font-semibold text-foreground">
              Entregáveis que pretende entregar
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {deliverableOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`del-${option.id}`}
                    checked={deliverables.includes(option.id)}
                    onCheckedChange={(checked) =>
                      handleDeliverableChange(option.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`del-${option.id}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Value & Portfolio Card */}
          <div className="inbazz-card p-6 space-y-6 animate-fade-in [animation-delay:200ms]">
            <h2 className="text-lg font-semibold text-foreground">
              Valor e Portfólio
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Valor desejado (R$)</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="2500"
                  value={proposedValue}
                  onChange={(e) => setProposedValue(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Link do portfólio</Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://seuportfolio.com"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload de mídia</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Arraste arquivos ou clique para fazer upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Imagens ou vídeos (max 50MB)
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/creator/campaigns")}
            >
              Cancelar
            </Button>
            <Button type="submit">Enviar Proposta</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
