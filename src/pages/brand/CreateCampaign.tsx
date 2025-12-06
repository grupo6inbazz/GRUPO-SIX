import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { nicheOptions } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";
import { DeliverableType, PaymentType } from "@/types";

const deliverableOptions: { id: DeliverableType; label: string }[] = [
  { id: "reels", label: "Reels" },
  { id: "stories", label: "Stories" },
  { id: "tiktok", label: "TikTok" },
  { id: "shorts", label: "Shorts" },
  { id: "photo", label: "Foto" },
  { id: "others", label: "Outros" },
];

const paymentOptions: { id: PaymentType; label: string }[] = [
  { id: "fixed", label: "Fixo" },
  { id: "barter", label: "Permuta" },
  { id: "commission", label: "Comissão (%)" },
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [budget, setBudget] = useState("");
  const [niche, setNiche] = useState("");
  const [deliverables, setDeliverables] = useState<DeliverableType[]>([]);
  const [deadline, setDeadline] = useState<Date>();
  const [paymentType, setPaymentType] = useState<PaymentType>("fixed");
  const [commission, setCommission] = useState("");

  const handleDeliverableChange = (id: DeliverableType, checked: boolean) => {
    if (checked) {
      setDeliverables([...deliverables, id]);
    } else {
      setDeliverables(deliverables.filter((d) => d !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Campanha criada!",
      description: "Sua campanha foi criada com sucesso.",
    });
    navigate("/brand/campaigns");
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/brand/campaigns")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Criar Campanha</h1>
            <p className="text-muted-foreground mt-1">
              Preencha os detalhes da sua nova campanha
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <div className="inbazz-card p-6 space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground">
              Informações Básicas
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da campanha</Label>
                <Input
                  id="name"
                  placeholder="Ex: Lançamento Verão 2025"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">Objetivo</Label>
                <Textarea
                  id="objective"
                  placeholder="Descreva o objetivo da campanha..."
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento total (R$)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="10000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Nicho / Categoria</Label>
                  <Select value={niche} onValueChange={setNiche} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nicho" />
                    </SelectTrigger>
                    <SelectContent>
                      {nicheOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables Card */}
          <div className="inbazz-card p-6 space-y-6 animate-fade-in [animation-delay:100ms]">
            <h2 className="text-lg font-semibold text-foreground">Entregáveis</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {deliverableOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={deliverables.includes(option.id)}
                    onCheckedChange={(checked) =>
                      handleDeliverableChange(option.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={option.id} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline & Payment Card */}
          <div className="inbazz-card p-6 space-y-6 animate-fade-in [animation-delay:200ms]">
            <h2 className="text-lg font-semibold text-foreground">
              Prazo e Pagamento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prazo</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline
                        ? format(deadline, "PPP", { locale: ptBR })
                        : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Tipo de pagamento</Label>
                <Select
                  value={paymentType}
                  onValueChange={(v) => setPaymentType(v as PaymentType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {paymentType === "commission" && (
                <div className="space-y-2">
                  <Label htmlFor="commission">Porcentagem de comissão (%)</Label>
                  <Input
                    id="commission"
                    type="number"
                    placeholder="15"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    min="1"
                    max="100"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/brand/campaigns")}
            >
              Cancelar
            </Button>
            <Button type="submit">Criar Campanha</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
