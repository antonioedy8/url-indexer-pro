import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Search } from "lucide-react";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApiKey {
  id: string;
  key: string;
  type: 'google' | 'bing';
  siteId: string;
}

interface Site {
  id: string;
  name: string;
  url: string;
  sitemap: string;
}

interface ConfigurationTabsProps {
  sitemap: string;
  setSitemap: (value: string) => void;
  googleKey: string;
  setGoogleKey: (value: string) => void;
  bingKey: string;
  setBingKey: (value: string) => void;
  onSitemapSubmit: (e: React.FormEvent) => void;
  onGoogleKeySubmit: (e: React.FormEvent) => void;
  onBingKeySubmit: (e: React.FormEvent) => void;
  sites: Site[];
  apiKeys: ApiKey[];
  onApiKeyDelete: (id: string) => void;
}

export const ConfigurationTabs = ({
  sitemap,
  setSitemap,
  googleKey,
  setGoogleKey,
  bingKey,
  setBingKey,
  onSitemapSubmit,
  onGoogleKeySubmit,
  onBingKeySubmit,
  sites,
  apiKeys,
  onApiKeyDelete,
}: ConfigurationTabsProps) => (
  <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.2s" }}>
    <h2 className="text-xl font-semibold mb-4">Configuração</h2>
    <Tabs defaultValue="sitemap" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="sitemap" className="flex items-center gap-2">
          <Map className="h-4 w-4" />
          Sitemap
        </TabsTrigger>
        <TabsTrigger value="google" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Google API
        </TabsTrigger>
        <TabsTrigger value="bing" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Bing API
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sitemap">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Registrar Sitemap</h3>
          <form onSubmit={onSitemapSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">URL do Sitemap</label>
              <Input
                placeholder="https://exemplo.com/sitemap.xml"
                value={sitemap}
                onChange={(e) => setSitemap(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Registrar Sitemap</Button>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="google">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">API do Google Search Console</h3>
          <div className="space-y-6">
            <GoogleAuthButton />
            <form onSubmit={onGoogleKeySubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Site</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um site" />
                  </SelectTrigger>
                  <SelectContent>
                    {sites.map((site) => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Chave da API</label>
                <Input
                  type="password"
                  placeholder="Digite sua chave da API do Google"
                  value={googleKey}
                  onChange={(e) => setGoogleKey(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Salvar Chave do Google</Button>
            </form>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">APIs Cadastradas</h4>
              <div className="space-y-2">
                {apiKeys
                  .filter(key => key.type === 'google')
                  .map(key => {
                    const site = sites.find(s => s.id === key.siteId);
                    return (
                      <div key={key.id} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                        <div>
                          <p className="font-medium">{site?.name}</p>
                          <p className="text-sm text-muted-foreground">{site?.url}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onApiKeyDelete(key.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="bing">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">API do Bing Webmaster</h3>
          <form onSubmit={onBingKeySubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Chave da API</label>
              <Input
                type="password"
                placeholder="Digite sua chave da API do Bing"
                value={bingKey}
                onChange={(e) => setBingKey(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Salvar Chave do Bing</Button>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  </section>
);
