
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp, AlertCircle, CheckCircle, Search, Globe, FileText, Image, Link } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SeoIssue {
  type: 'error' | 'warning' | 'success';
  title: string;
  description: string;
  impact: 'Alto' | 'Médio' | 'Baixo';
}

interface TopKeyword {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface ContentSuggestion {
  topic: string;
  suggestedTitles: string[];
  estimatedTraffic: number;
  difficulty: number;
}

const mockTopKeywords: TopKeyword[] = [
  { keyword: "exemplo seo", clicks: 1200, impressions: 15000, ctr: 8, position: 3.5 },
  { keyword: "otimização site", clicks: 800, impressions: 12000, ctr: 6.7, position: 4.2 },
  // ... mais keywords
];

const mockSeoIssues: SeoIssue[] = [
  {
    type: 'error',
    title: 'Títulos Duplicados Detectados',
    description: 'Encontrados 3 páginas com títulos idênticos. Isso pode confundir os mecanismos de busca.',
    impact: 'Alto'
  },
  {
    type: 'warning',
    title: 'Imagens sem Alt Text',
    description: '12 imagens encontradas sem texto alternativo, dificultando a acessibilidade e SEO.',
    impact: 'Médio'
  },
  // ... mais issues
];

const mockContentSuggestions: ContentSuggestion[] = [
  {
    topic: "SEO para Iniciantes",
    suggestedTitles: [
      "Guia Completo de SEO para Iniciantes em 2024",
      "10 Passos Fundamentais para Começar com SEO",
      "SEO Básico: Tudo que Você Precisa Saber"
    ],
    estimatedTraffic: 5000,
    difficulty: 45
  },
  // ... mais sugestões
];

export const SeoAnalysis = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Análise de SEO</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="issues">Problemas</TabsTrigger>
          <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Métricas Principais</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Pontuação SEO</span>
                  <span className="font-bold text-green-500">85/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Páginas Indexadas</span>
                  <span className="font-bold">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Problemas Críticos</span>
                  <span className="font-bold text-red-500">3</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Tráfego Orgânico</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockTopKeywords}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="keyword" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="clicks" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Top Keywords</h3>
              <div className="space-y-4">
                {mockTopKeywords.map((keyword, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{keyword.keyword}</span>
                      <span className="text-sm text-muted-foreground">
                        Posição: {keyword.position}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Clicks</span>
                        <p className="font-medium">{keyword.clicks}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impressões</span>
                        <p className="font-medium">{keyword.impressions}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">CTR</span>
                        <p className="font-medium">{keyword.ctr}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <ScrollArea className="h-[500px]">
            {mockSeoIssues.map((issue, index) => (
              <Alert
                key={index}
                variant={issue.type === 'error' ? 'destructive' : 'default'}
                className="mb-4"
              >
                <div className="flex items-center gap-2">
                  {issue.type === 'error' ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  <AlertTitle className="flex items-center justify-between w-full">
                    <span>{issue.title}</span>
                    <span className={`text-sm ${
                      issue.impact === 'Alto' ? 'text-red-500' :
                      issue.impact === 'Médio' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      Impacto: {issue.impact}
                    </span>
                  </AlertTitle>
                </div>
                <AlertDescription className="mt-2">
                  {issue.description}
                </AlertDescription>
              </Alert>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          {mockContentSuggestions.map((suggestion, index) => (
            <Card key={index} className="p-4">
              <h3 className="text-lg font-medium mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {suggestion.topic}
                </div>
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Tráfego Estimado</span>
                    <p className="font-medium">{suggestion.estimatedTraffic} visitas/mês</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dificuldade</span>
                    <p className="font-medium">{suggestion.difficulty}/100</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Sugestões de Títulos:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {suggestion.suggestedTitles.map((title, idx) => (
                      <li key={idx} className="text-sm">{title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
