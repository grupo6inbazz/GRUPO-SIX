import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/format";
import { 
  User, 
  Mail, 
  MapPin, 
  Link as LinkIcon, 
  Settings, 
  Instagram, 
  Users, 
  TrendingUp,
  Megaphone,
  FileText
} from "lucide-react";

export default function Profile() {
  const { userType } = useUser();
  const navigate = useNavigate();

  const profileData = {
    name: userType === "brand" ? "Minha Empresa" : "João Silva",
    email: "contato@exemplo.com",
    location: "São Paulo, SP",
    bio: userType === "brand" 
      ? "Empresa líder em moda sustentável, conectando marcas e criadores." 
      : "Criador de conteúdo apaixonado por moda e lifestyle.",
    website: "https://meusite.com",
    instagram: "@meuinstagram",
    avatar: "https://i.pravatar.cc/150?img=8",
    followers: 125000,
    engagementRate: 4.8,
    campaigns: 12,
    proposals: 47,
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
            <p className="text-muted-foreground mt-1">
              Visualize e gerencie seu perfil
            </p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate(`/${userType}/profile/settings`)}
          >
            <Settings className="w-4 h-4" />
            Configurações
          </Button>
        </div>

        {/* Profile Card */}
        <div className="inbazz-card p-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-border"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.bio}</p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Instagram className="w-4 h-4" />
                  <span>{profileData.instagram}</span>
                </div>
              </div>

              {profileData.website && (
                <a 
                  href={profileData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <LinkIcon className="w-4 h-4" />
                  {profileData.website}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {userType === "creator" && (
            <>
              <div className="inbazz-card p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Seguidores</p>
                    <p className="text-lg font-semibold">{formatNumber(profileData.followers)}</p>
                  </div>
                </div>
              </div>
              <div className="inbazz-card p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engajamento</p>
                    <p className="text-lg font-semibold">{profileData.engagementRate}%</p>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Megaphone className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Campanhas</p>
                <p className="text-lg font-semibold">{profileData.campaigns}</p>
              </div>
            </div>
          </div>
          <div className="inbazz-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <FileText className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Propostas</p>
                <p className="text-lg font-semibold">{profileData.proposals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="inbazz-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Ações Rápidas</h3>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate(`/${userType}/profile/settings`)}
            >
              <User className="w-4 h-4" />
              Editar Perfil
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate(`/${userType}/campaigns`)}
            >
              <Megaphone className="w-4 h-4" />
              Ver Campanhas
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate(`/${userType}/proposals`)}
            >
              <FileText className="w-4 h-4" />
              Ver Propostas
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}