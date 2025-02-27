
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Settings2, Key, Bell, Shield, Database } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleSaveSettings = () => {
    toast({
      title: "Sucesso",
      description: "Configurações salvas com sucesso",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Configurações</h1>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
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
