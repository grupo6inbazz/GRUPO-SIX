import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Briefcase, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Onboarding() {
  const navigate = useNavigate();
  const { setUserType } = useUser();

  const handleSelectType = (type: "brand" | "creator") => {
    setUserType(type);
    navigate(type === "brand" ? "/brand/dashboard" : "/creator/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="inbazz-gradient-text">Inbazz</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Conectando marcas e criadores para campanhas de sucesso
        </p>
      </div>

      {/* Profile Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
        {/* Brand Card */}
        <button
          onClick={() => handleSelectType("brand")}
          className={cn(
            "group inbazz-card inbazz-card-hover p-8 text-left transition-all duration-300",
            "border-2 border-transparent hover:border-primary/30",
            "animate-fade-in [animation-delay:100ms]"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
              <Briefcase className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-foreground">Sou Marca</h2>
            <p className="text-muted-foreground text-sm">
              Crie campanhas, encontre criadores e gerencie colaborações
            </p>
            <div className="mt-6 px-4 py-2 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              WEB
            </div>
          </div>
        </button>

        {/* Creator Card */}
        <button
          onClick={() => handleSelectType("creator")}
          className={cn(
            "group inbazz-card inbazz-card-hover p-8 text-left transition-all duration-300",
            "border-2 border-transparent hover:border-secondary/30",
            "animate-fade-in [animation-delay:200ms]"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-2xl bg-secondary/10 mb-6 group-hover:bg-secondary/20 transition-colors">
              <UserPlus className="w-12 h-12 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-foreground">Sou Criador</h2>
            <p className="text-muted-foreground text-sm">
              Encontre campanhas, envie propostas e faça colabs
            </p>
            <div className="mt-6 px-4 py-2 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              MOBILE
            </div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <p className="mt-12 text-xs text-muted-foreground animate-fade-in [animation-delay:300ms]">
        Escolha seu perfil para continuar
      </p>
    </div>
  );
}
