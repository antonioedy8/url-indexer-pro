
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ApiKeyService } from "@/services/apiKeyService";
import { IndexHeader } from "@/components/IndexHeader";
import { StatsOverview } from "@/components/StatsOverview";
import { ConfigurationTabs } from "@/components/ConfigurationTabs";
import { CrawlForm } from "@/components/CrawlForm";
import { UrlSubmission } from "@/components/UrlSubmission";
import { RecentActivity } from "@/components/RecentActivity";

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
          <h2 className="text-xl font-semibold mb-4">Análise de Conteúdo</h2>
          <CrawlForm />
        </section>

        <UrlSubmission
          onUrlChange={setUrls}
          onSubmit={handleUrlSubmit}
        />

        <RecentActivity />
      </main>
    </div>
  );
};

export default Index;
