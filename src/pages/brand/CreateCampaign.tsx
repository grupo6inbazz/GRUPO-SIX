import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight, FileText, Share2, Trophy, Shield, Rocket } from "lucide-react";
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
import { Calendar as CalendarIcon } from "lucide-react";

const steps = [
  { id: 1, title: "Dados gerais", icon: FileText },
  { id: 2, title: "Redes sociais", icon: Share2 },
  { id: 3, title: "Pontuação & recompensas", subtitle: "Defina a forma de pontuação da campanha e as recompensas para os criadores.", icon: Trophy },
  { id: 4, title: "Permissões", icon: Shield },
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Dados gerais
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [budget, setBudget] = useState("");
  const [niche, setNiche] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [paymentType, setPaymentType] = useState<PaymentType>("fixed");
  const [commission, setCommission] = useState("");

  // Step 2: Redes sociais (Instagram)
  const [instagramStories, setInstagramStories] = useState(false);
  const [instagramStoriesCount, setInstagramStoriesCount] = useState("10");
  const [instagramStoriesLimit, setInstagramStoriesLimit] = useState(false);
  const [instagramStoriesLimitValue, setInstagramStoriesLimitValue] = useState("100");
  const [instagramPostFeed, setInstagramPostFeed] = useState(false);
  const [instagramReels, setInstagramReels] = useState(false);
  const [instagramReelsViews, setInstagramReelsViews] = useState(false);
  const [instagramReelsViewsValue, setInstagramReelsViewsValue] = useState("10000");

  // Step 2: Compartilhamentos e comentários
  const [compartilhamento, setCompartilhamento] = useState(false);
  const [comentario, setComentario] = useState(false);

  // Step 2: Cliques e vendas
  const [cliquesNoLink, setCliquesNoLink] = useState(false);
  const [usoDeCupom, setUsoDeCupom] = useState(false);
  const [valorVendido, setValorVendido] = useState(false);
  const [valorVendidoValue, setValorVendidoValue] = useState("50000");

  // Step 3: Recompensas
  const [rankingName, setRankingName] = useState("noite com luz");
  const [vencedores, setVencedores] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");

  // Step 4: Permissões
  const [permiteColab, setPermiteColab] = useState(true);
  const [aprovacaoAutomatica, setAprovacaoAutomatica] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Campanha criada!",
      description: "Sua campanha foi criada com sucesso.",
    });
    navigate("/brand/campaigns");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da campanha *</Label>
              <Input
                id="name"
                placeholder="Ex: Lançamento Verão 2025"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective">Objetivo *</Label>
              <Textarea
                id="objective"
                placeholder="Descreva o objetivo da campanha..."
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                rows={3}
                className="max-w-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
              <div className="space-y-2">
                <Label htmlFor="budget">Orçamento total (R$) *</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="10000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Nicho / Categoria *</Label>
                <Select value={niche} onValueChange={setNiche}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
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
                    <SelectItem value="fixed">Fixo</SelectItem>
                    <SelectItem value="barter">Permuta</SelectItem>
                    <SelectItem value="commission">Comissão (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {paymentType === "commission" && (
              <div className="space-y-2 max-w-xl">
                <Label htmlFor="commission">Porcentagem de comissão (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  placeholder="15"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  min="1"
                  max="100"
                  className="max-w-[200px]"
                />
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Instagram Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-bold">ig</span>
                </div>
                <h3 className="font-semibold">Instagram</h3>
              </div>
              <p className="text-sm text-muted-foreground">Pontuação acumulada por criativo postado</p>

              {/* Stories */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Stories</Label>
                  <Select defaultValue="sequencia">
                    <SelectTrigger className="w-[200px] h-8">
                      <SelectValue placeholder="Sequência de story por dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sequencia">Sequência de story por dia</SelectItem>
                      <SelectItem value="individual">Por story individual</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="ml-auto">
                    <Label className="text-sm text-muted-foreground">Post no Feed</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="stories"
                      checked={instagramStories}
                      onCheckedChange={(checked) => setInstagramStories(checked as boolean)}
                    />
                    <Label htmlFor="stories" className="text-sm cursor-pointer">Stories</Label>
                    <Input
                      value={instagramStoriesCount}
                      onChange={(e) => setInstagramStoriesCount(e.target.value)}
                      className="w-24 h-8"
                      placeholder="10"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="postFeed"
                      checked={instagramPostFeed}
                      onCheckedChange={(checked) => setInstagramPostFeed(checked as boolean)}
                    />
                    <Label htmlFor="postFeed" className="text-sm cursor-pointer">Post no Feed</Label>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="limitarStories"
                    checked={instagramStoriesLimit}
                    onCheckedChange={(checked) => setInstagramStoriesLimit(checked as boolean)}
                  />
                  <Label htmlFor="limitarStories" className="text-sm cursor-pointer">Limitar stories</Label>
                  <Input
                    value={instagramStoriesLimitValue}
                    onChange={(e) => setInstagramStoriesLimitValue(e.target.value)}
                    className="w-24 h-8"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Reels */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Reels</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="reels"
                      checked={instagramReels}
                      onCheckedChange={(checked) => setInstagramReels(checked as boolean)}
                    />
                    <Label htmlFor="reels" className="text-sm cursor-pointer">Reels</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="reelsViews"
                      checked={instagramReelsViews}
                      onCheckedChange={(checked) => setInstagramReelsViews(checked as boolean)}
                    />
                    <Label htmlFor="reelsViews" className="text-sm cursor-pointer">Mi views</Label>
                    <Input
                      value={instagramReelsViewsValue}
                      onChange={(e) => setInstagramReelsViewsValue(e.target.value)}
                      className="w-32 h-8"
                      placeholder="10000"
                    />
                  </div>
                </div>
              </div>

              {/* Compartilhamentos */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Compartilhamentos</Label>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="compartilhamento"
                    checked={compartilhamento}
                    onCheckedChange={(checked) => setCompartilhamento(checked as boolean)}
                  />
                  <Label htmlFor="compartilhamento" className="text-sm cursor-pointer">Compartilhamento</Label>
                </div>
              </div>

              {/* Comentários */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Comentários em posts da sua marca</Label>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="comentario"
                    checked={comentario}
                    onCheckedChange={(checked) => setComentario(checked as boolean)}
                  />
                  <Label htmlFor="comentario" className="text-sm cursor-pointer">Comentário</Label>
                </div>
              </div>

              {/* Cliques e vendas */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Cliques e vendas</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="cliques"
                      checked={cliquesNoLink}
                      onCheckedChange={(checked) => setCliquesNoLink(checked as boolean)}
                    />
                    <Label htmlFor="cliques" className="text-sm cursor-pointer">Cliques no link</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="cupom"
                      checked={usoDeCupom}
                      onCheckedChange={(checked) => setUsoDeCupom(checked as boolean)}
                    />
                    <Label htmlFor="cupom" className="text-sm cursor-pointer">Uso de cupom</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="valorVendido"
                      checked={valorVendido}
                      onCheckedChange={(checked) => setValorVendido(checked as boolean)}
                    />
                    <Label htmlFor="valorVendido" className="text-sm cursor-pointer">Valor vendido</Label>
                    <Input
                      value={valorVendidoValue}
                      onChange={(e) => setValorVendidoValue(e.target.value)}
                      className="w-32 h-8"
                      placeholder="50000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="inbazz-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Ranking</h3>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Como você prefere recompensar os seus criadores?</Label>
                <p className="text-xs text-muted-foreground">
                  Defina uma recompensa para as posições do ranking que você quer bonificar.
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Obs.: O campo 'Preço de custo' é opcional, aparecerá apenas para a marca e tem como objetivo auxiliar no cálculo do ROI da recompensa.
              </p>

              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">1º</span>
                </div>
                <Input
                  value={rankingName}
                  onChange={(e) => setRankingName(e.target.value)}
                  placeholder="nome da recompensa"
                  className="flex-1"
                />
                <Input
                  value={vencedores}
                  onChange={(e) => setVencedores(e.target.value)}
                  placeholder="Vencedores (Ex.: 5)"
                  className="w-32"
                />
                <Input
                  value={precoCusto}
                  onChange={(e) => setPrecoCusto(e.target.value)}
                  placeholder="Preço de custo"
                  className="w-32"
                />
                <Button variant="outline" size="icon" className="shrink-0">
                  <Rocket className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>—</span>
                <span>1</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="inbazz-card p-5 space-y-4">
              <h3 className="font-semibold text-foreground">Configurações de permissões</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <Label className="text-sm font-medium">Permitir colaborações entre criadores</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Criadores poderão convidar outros criadores para participar da campanha
                    </p>
                  </div>
                  <Checkbox
                    checked={permiteColab}
                    onCheckedChange={(checked) => setPermiteColab(checked as boolean)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <Label className="text-sm font-medium">Aprovação automática de criadores</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Novos criadores serão aprovados automaticamente para participar
                    </p>
                  </div>
                  <Checkbox
                    checked={aprovacaoAutomatica}
                    onCheckedChange={(checked) => setAprovacaoAutomatica(checked as boolean)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Steps */}
      <aside className="w-80 bg-card border-r border-border p-6 flex flex-col">
        {/* Header */}
        <button
          onClick={() => navigate("/brand/campaigns")}
          className="flex items-center gap-2 text-sm text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Criar campanha
        </button>

        {/* Logo */}
        <div className="mb-8">
          <Rocket className="w-10 h-10 text-primary" />
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground leading-tight">
            Siga o passo a passo abaixo para completar a criação da sua campanha:
          </h2>
        </div>

        {/* Steps */}
        <nav className="flex-1 space-y-2">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const StepIcon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                  isActive
                    ? "bg-primary/10"
                    : "hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  {step.subtitle && isActive && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {step.subtitle}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-14 border-b border-border px-6 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">*Campos obrigatórios</span>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Ajuda
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">GRUPO SIX</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl">
            {renderStepContent()}
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="h-16 border-t border-border px-8 flex items-center justify-end gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Voltar
          </Button>
          <Button onClick={handleNext} className="gap-2">
            {currentStep === steps.length ? "Criar campanha" : "Avançar"}
            {currentStep !== steps.length && <ChevronRight className="w-4 h-4" />}
          </Button>
        </footer>
      </main>
    </div>
  );
}
