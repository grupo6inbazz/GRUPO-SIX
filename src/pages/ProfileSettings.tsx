import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { Camera, Upload, User, Mail, Phone, MapPin, Link, Save } from "lucide-react";

export default function ProfileSettings() {
  const { toast } = useToast();
  const { userType } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState({
    name: userType === "brand" ? "Minha Empresa" : "João Silva",
    email: "contato@exemplo.com",
    phone: "(11) 99999-9999",
    location: "São Paulo, SP",
    bio: userType === "brand" 
      ? "Empresa líder em moda sustentável, conectando marcas e criadores." 
      : "Criador de conteúdo apaixonado por moda e lifestyle.",
    website: "https://meusite.com",
    instagram: "@meuinstagram",
    avatar: "https://i.pravatar.cc/150?img=8",
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          setProfileData((prev) => ({
            ...prev,
            avatar: reader.result as string,
          }));
          setIsUploading(false);
          toast({
            title: "Foto atualizada!",
            description: "Sua foto de perfil foi alterada com sucesso.",
          });
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Perfil salvo!",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações do Perfil</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas informações pessoais e foto de perfil
          </p>
        </div>

        {/* Avatar Section */}
        <div className="inbazz-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Foto de Perfil</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div 
                className={`w-32 h-32 rounded-full overflow-hidden border-4 border-border cursor-pointer transition-all duration-200 ${isUploading ? 'opacity-50' : 'group-hover:border-primary'}`}
                onClick={handleAvatarClick}
              >
                <img
                  src={profileData.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left space-y-2">
              <h3 className="font-medium text-foreground">{profileData.name}</h3>
              <p className="text-sm text-muted-foreground">
                Clique na foto para alterar ou use o botão abaixo
              </p>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleAvatarClick}
                disabled={isUploading}
              >
                <Upload className="w-4 h-4" />
                Fazer Upload
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="inbazz-card p-6 space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Informações Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {userType === "brand" ? "Nome da Empresa" : "Nome Completo"}
              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Localização
              </Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio / Descrição</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={4}
            />
          </div>
        </div>

        {/* Social Links Section */}
        <div className="inbazz-card p-6 space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Links e Redes Sociais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Website
              </Label>
              <Input
                id="website"
                value={profileData.website}
                onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={profileData.instagram}
                onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg" className="gap-2" onClick={handleSave}>
            <Save className="w-5 h-5" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
