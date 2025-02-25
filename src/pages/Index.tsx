
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ApiKeyService } from "@/services/apiKeyService";
import { IndexHeader } from "@/components/IndexHeader";
import { StatsOverview } from "@/components/StatsOverview";
import { ConfigurationTabs } from "@/components/ConfigurationTabs";
import { CrawlForm } from "@/components/CrawlForm";
import { UrlSubmission } from "@/components/UrlSubmission";
import { RecentActivity } from "@/components/RecentActivity";
import { IndexingMonitor } from "@/components/IndexingMonitor";
import { ExternalApiService } from "@/utils/ExternalApiService";
import { Card } from "@/components/ui/card";
import { Globe, TrendingUp, BarChart3, Settings } from "lucide-react";

interface IndexingStats {
  totalUrls: number;
  activeApis: number;
  successRate: number;
  remainingQuota: number;
  indexedUrls?: number;
  trafficIncrease?: number;
}

const Index = () => {
  const { toast } = useToast();
  const [urls, setUrls] = useState<string[]>([]);
  const [sitemap, setSitemap] = useState("");
  const [googleKey, setGoogleKey] = useState("");
  const [bingKey, setBingKey] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [externalMetrics, setExternalMetrics] = useState<any>(null);
  const [stats, setStats] = useState<IndexingStats>({
    totalUrls: 0,
    activeApis: 0,
    successRate: 0,
    remainingQuota: 200,
    indexedUrls: 0,
    trafficIncrease: 0,
  });

  useEffect(() => {
    updateStats();
  }, []);

  const updateStats = async () => {
    const keys = ApiKeyService.getStoredKeys();
    const googleQuota = ApiKeyService.getRemainingQuota('google');
    const bingQuota = ApiKeyService.getRemainingQuota('bing');
    
    // Simular algumas estatísticas para demonstração
    setStats({
      totalUrls: 150,
      activeApis: keys.length,
      successRate: 85,
      remainingQuota: googleQuota + bingQuota,
      indexedUrls: 128,
      trafficIncrease: 32,
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

  const handleUrlSubmit = async (e: React.FormEvent) => {
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

    try {
      if (urls.length > 0) {
        setSelectedUrl(urls[0]);
        const metrics = await ExternalApiService.getComprehensiveAnalysis(urls[0]);
        setExternalMetrics(metrics);
        
        toast({
          title: "Sucesso",
          description: "URLs enviadas para indexação",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao processar URLs",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-background to-secondary">
      <IndexHeader />

      <main className="space-y-8">
        <StatsOverview {...stats} />

        <ConfigurationTabs
          sitemap={sitemap}
          setSitemap={setSitemap}
          googleKey={googleKey}
          setGoogleKey={setGoogleKey}
          bingKey={bingKey}
          setBingKey={setBingKey}
          onSitemapSubmit={handleSitemapSubmit}
          onGoogleKeySubmit={handleGoogleKeySubmit}
          onBingKeySubmit={handleBingKeySubmit}
        />

        <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-xl font-semibold mb-4">Análise de Conteúdo e SEO</h2>
          <CrawlForm />
        </section>

        <UrlSubmission
          onUrlChange={setUrls}
          onSubmit={handleUrlSubmit}
        />

        {selectedUrl && (
          <IndexingMonitor url={selectedUrl} />
        )}

        {externalMetrics && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Métricas Externas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<Globe className="h-5 w-5 text-blue-500" />}
                title="Autoridade do Domínio"
                value={`${externalMetrics.metrics.domainAuthority}/100`}
              />
              <StatCard
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                title="Backlinks"
                value={externalMetrics.metrics.backlinks.toString()}
              />
              <StatCard
                icon={<BarChart3 className="h-5 w-5 text-yellow-500" />}
                title="Performance"
                value={`${externalMetrics.lighthouse.performance}%`}
              />
              <StatCard
                icon={<Settings className="h-5 w-5 text-purple-500" />}
                title="SEO Score"
                value={`${externalMetrics.lighthouse.seo}%`}
              />
            </div>
          </Card>
        )}

        <RecentActivity />
      </main>
    </div>
  );
};

export default Index;
