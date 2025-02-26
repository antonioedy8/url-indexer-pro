
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
import { ExternalMetrics } from "@/components/ExternalMetrics";
import { SeoAnalysis } from "@/components/SeoAnalysis";

interface IndexingStats {
  totalUrls: number;
  activeApis: number;
  successRate: number;
  remainingQuota: number;
  indexedUrls?: number;
  trafficIncrease?: number;
}

interface Site {
  id: string;
  name: string;
  url: string;
  sitemap: string;
}

interface ApiKey {
  id: string;
  key: string;
  type: 'google' | 'bing';
  siteId: string;
}

const Index = () => {
  const { toast } = useToast();
  const [urls, setUrls] = useState<string[]>([]);
  const [sitemap, setSitemap] = useState("");
  const [googleKey, setGoogleKey] = useState("");
  const [bingKey, setBingKey] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [externalMetrics, setExternalMetrics] = useState<any>(null);
  const [sites, setSites] = useState<Site[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
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
      ApiKeyService.saveApiKey(googleKey, 'google', "default-site");
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
      ApiKeyService.saveApiKey(bingKey, 'bing', "default-site");
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

  const handleApiKeyDelete = (id: string) => {
    ApiKeyService.deleteApiKey(id);
    updateStats();
    toast({
      title: "Sucesso",
      description: "Chave API removida com sucesso",
    });
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const googleApiKey = ApiKeyService.getAvailableKey('google', "default-site");
    const bingApiKey = ApiKeyService.getAvailableKey('bing', "default-site");
    
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            sites={sites}
            apiKeys={apiKeys}
            onApiKeyDelete={handleApiKeyDelete}
          />

          {externalMetrics && (
            <ExternalMetrics metrics={externalMetrics} />
          )}
        </div>

        <SeoAnalysis />

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

        <RecentActivity />
      </main>
    </div>
  );
};

export default Index;
