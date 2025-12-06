import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, MapPin, Link as LinkIcon } from "lucide-react";

export default function Profile() {
  const { userType } = useUser();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Perfil</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas informações pessoais
          </p>
        </div>

        {/* Profile Card */}
        <div className="inbazz-card p-6 space-y-6 animate-fade-in">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <Button variant="outline" size="sm">
                Alterar foto
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  defaultValue={userType === "brand" ? "Minha Marca" : "João Silva"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    placeholder="seu@email.com"
                    defaultValue="contato@exemplo.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Conte um pouco sobre você..."
                rows={3}
                defaultValue={
                  userType === "brand"
                    ? "Somos uma marca inovadora focada em experiências únicas."
                    : "Criador de conteúdo apaixonado por compartilhar histórias."
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    className="pl-9"
                    placeholder="São Paulo, SP"
                    defaultValue="São Paulo, SP"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="website"
                    className="pl-9"
                    placeholder="https://seusite.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Salvar alterações</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
