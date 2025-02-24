
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CrawlForm } from "@/components/CrawlForm";
import { useToast } from "@/components/ui/use-toast";
import { ApiKeyService } from "@/services/apiKeyService";
import {
  ChevronRight,
  Globe,
  Key,
  BarChart3,
  Settings,
  Map,
  Search,
  ListPlus,
  History,
  AlertCircle,
} from "lucide-react";

interface IndexingStats {
  totalUrls: number;
  activeApis: number;
  successRate: number;
  remainingQuota: number;
}

const Index = () => {
  const { toast } = useToast();
  const [urls, setUrls] = useState<string[]>([]);
  const [sitemap, setSitemap] = useState("");
  const [googleKey, setGoogleKey] = useState("");
  const [bingKey, setBingKey] = useState("");
  const [stats, setStats] = useState<IndexingStats>({
    totalUrls: 0,
    activeApis: 0,
    successRate: 0,
    remainingQuota: 200,
  });

  useEffect(() => {
    updateStats();
  }, []);

  const updateStats = () => {
    const keys = ApiKeyService.getStoredKeys();
    const googleQuota = ApiKeyService.getRemainingQuota('google');
    const bingQuota = ApiKeyService.getRemainingQuota('bing');
    
    setStats({
      totalUrls: 0,
      activeApis: keys.length,
      successRate: 0,
      remainingQuota: googleQuota + bingQuota,
    });
  };

  const handleSitemapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering sitemap:", sitemap);
  };

  const handleGoogleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      ApiKeyService.saveApiKey(googleKey, 'google');
      toast({
        title: "Sucesso",
        description: "Chave da API do Google salva com sucesso",
      });
      setGoogleKey("");
      updateStats();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar a chave da API",
        variant: "destructive",
      });
    }
  };

  const handleBingKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      ApiKeyService.saveApiKey(bingKey, 'bing');
      toast({
        title: "Sucesso",
        description: "Chave da API do Bing salva com sucesso",
      });
      setBingKey("");
      updateStats();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar a chave da API",
        variant: "destructive",
      });
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const googleApiKey = ApiKeyService.getAvailableKey('google');
    const bingApiKey = ApiKeyService.getAvailableKey('bing');
    
    if (!googleApiKey && !bingApiKey) {
      toast({
        title: "Erro",
        description: "Nenhuma chave API disponível. Todas as quotas foram atingidas.",
        variant: "destructive",
      });
      return;
    }

    console.log("Submitting URLs:", urls);
    console.log("Using Google API Key:", googleApiKey);
    console.log("Using Bing API Key:", bingApiKey);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-background to-secondary">
      <header className="fade-enter">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">URL Indexer Pro</h1>
            <p className="text-muted-foreground mt-2">
              Automatize a indexação de URLs no Google e Bing
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            API Status <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="space-y-8">
        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 fade-enter" style={{ animationDelay: "0.1s" }}>
          <StatCard
            icon={<Globe className="h-5 w-5 text-blue-500" />}
            title="Total de URLs"
            value={stats.totalUrls.toString()}
          />
          <StatCard
            icon={<Key className="h-5 w-5 text-green-500" />}
            title="APIs Ativas"
            value={stats.activeApis.toString()}
          />
          <StatCard
            icon={<BarChart3 className="h-5 w-5 text-yellow-500" />}
            title="Taxa de Sucesso"
            value={`${stats.successRate}%`}
          />
          <StatCard
            icon={<Settings className="h-5 w-5 text-purple-500" />}
            title="Quota Restante"
            value={`${stats.remainingQuota}/dia`}
          />
        </section>

        {/* Configuration Tabs */}
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
                <form onSubmit={handleSitemapSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      URL do Sitemap
                    </label>
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
                <form onSubmit={handleGoogleKeySubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Chave da API
                    </label>
                    <Input
                      type="password"
                      placeholder="Digite sua chave da API do Google"
                      value={googleKey}
                      onChange={(e) => setGoogleKey(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">Salvar Chave do Google</Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="bing">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">API do Bing Webmaster</h3>
                <form onSubmit={handleBingKeySubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Chave da API
                    </label>
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

        {/* URL Analysis */}
        <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-xl font-semibold mb-4">Análise de Conteúdo</h2>
          <CrawlForm />
        </section>

        {/* URL Submission */}
        <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-semibold mb-4">Enviar URLs</h2>
          <form onSubmit={handleUrlSubmit}>
            <div className="flex gap-4">
              <Input
                placeholder="Digite uma URL ou cole múltiplas URLs"
                className="flex-1"
                onChange={(e) => {
                  const newUrls = e.target.value
                    .split("\n")
                    .map((url) => url.trim())
                    .filter(Boolean);
                  setUrls(newUrls);
                }}
              />
              <Button type="submit" className="bg-accent hover:bg-accent-hover text-white">
                Enviar para Indexação
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Digite uma URL por linha ou cole múltiplas URLs
            </p>
          </form>
        </section>

        {/* Recent Activity */}
        <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
          <div className="text-center text-muted-foreground py-8">
            Nenhuma atividade de indexação recente
          </div>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <Card className="p-6 flex flex-col glass-panel transition-all hover:scale-[1.02] cursor-pointer">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h3 className="font-medium text-sm">{title}</h3>
    </div>
    <p className="text-2xl font-semibold">{value}</p>
  </Card>
);

export default Index;
