
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SeoAnalysis } from "@/components/SeoAnalysis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search, Globe, FileText, BarChart2 } from "lucide-react";
import { ExternalMetrics } from "@/components/ExternalMetrics";

const Seo = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma URL para análise",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    try {
      // Simulação de análise
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Sucesso",
        description: "Análise SEO concluída com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao realizar análise SEO",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Análise SEO</h1>
      
      <Card className="p-6">
        <form onSubmit={handleAnalysis} className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Digite a URL do site para análise"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={analyzing}>
              {analyzing ? "Analisando..." : "Analisar"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SeoAnalysis />
        <ExternalMetrics
          metrics={{
            domainAuthority: 45,
            backlinks: 1500,
            lighthouse: {
              performance: 85,
              seo: 92
            }
          }}
        />
      </div>
    </div>
  );
};

export default Seo;
