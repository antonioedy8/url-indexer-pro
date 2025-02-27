
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Settings2, Key, Bell, Shield, Database } from "lucide-react";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [propertyId, setPropertyId] = useState("");

  const handleSaveSettings = () => {
    toast({
      title: "Sucesso",
      description: "Configurações salvas com sucesso",
    });
  };

  const handleSaveGoogleSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleAnalyticsId || !propertyId) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos necessários",
        variant: "destructive",
      });
      return;
    }

    // Aqui você pode salvar as configurações do Google
    toast({
      title: "Sucesso",
      description: "Configurações do Google salvas com sucesso",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Configurações</h1>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList>
          <TabsTrigger value="geral">
            <Settings2 className="w-4 h-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="w-4 h-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="google">
            <Database className="w-4 h-4 mr-2" />
            Google Integrations
          </TabsTrigger>
          <TabsTrigger value="notificacoes">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca">
            <Shield className="w-4 h-4 mr-2" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Ativar tema escuro na interface
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Button onClick={handleSaveSettings}>Salvar Alterações</Button>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <Label>Chave API</Label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Digite sua chave API"
              />
              <Button onClick={handleSaveSettings}>Salvar Chave API</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="google">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Integrações Google</h3>
              <p className="text-sm text-muted-foreground">
                Conecte sua conta Google para acessar dados do Search Console e Analytics
              </p>
              
              <div className="space-y-4">
                <GoogleAuthButton />
                
                <div className="pt-4">
                  <Label>Google Analytics ID</Label>
                  <Input
                    className="mt-2"
                    placeholder="UA-XXXXXXXXX-X ou G-XXXXXXXXXX"
                    value={googleAnalyticsId}
                    onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Property ID (Search Console)</Label>
                  <Input
                    className="mt-2"
                    placeholder="Digite o ID da propriedade do Search Console"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                  />
                </div>

                <Button onClick={handleSaveGoogleSettings} className="w-full">
                  Salvar Configurações do Google
                </Button>
              </div>

              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <h4 className="font-medium mb-2">Dados que serão coletados:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Posições nos resultados de pesquisa</li>
                  <li>• Impressões e cliques</li>
                  <li>• Palavras-chave principais</li>
                  <li>• Análise de tráfego</li>
                  <li>• Comportamento do usuário</li>
                  <li>• Dados demográficos</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receber atualizações por email
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Autenticação em Duas Etapas</h3>
              <p className="text-sm text-muted-foreground">
                Adicione uma camada extra de segurança à sua conta
              </p>
              <Button variant="outline">Configurar 2FA</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
