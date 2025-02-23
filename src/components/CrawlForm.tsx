
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Card } from "@/components/ui/card";
import { Globe, Search, AlertCircle } from "lucide-react";

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

interface SEOMetrics {
  title: string;
  description: string;
  h1Count: number;
  imagesWithoutAlt: number;
  brokenLinks: number;
}

export const CrawlForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    
    try {
      const apiKey = FirecrawlService.getApiKey();
      if (!apiKey) {
        toast({
          title: "Error",
          description: "Please set your API key first",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      console.log('Starting crawl for URL:', url);
      const result = await FirecrawlService.crawlWebsite(url);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Website crawled successfully",
          duration: 3000,
        });
        setCrawlResult(result.data);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to crawl website",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast({
        title: "Error",
        description: "Failed to crawl website",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  const renderMetricCard = (icon: React.ReactNode, title: string, value: string | number, alert?: boolean) => (
    <Card className={`p-4 ${alert ? 'border-red-500' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <p className={`text-xl font-semibold ${alert ? 'text-red-500' : ''}`}>{value}</p>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="url" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Enter Website URL for Analysis
            </label>
            <div className="flex gap-4">
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                placeholder="https://example.com"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 min-w-[120px]"
              >
                {isLoading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
          {isLoading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                Analyzing website structure and content...
              </p>
            </div>
          )}
        </form>
      </div>

      {crawlResult && (
        <Card className="w-full max-w-4xl mx-auto p-6">
          <h3 className="text-2xl font-semibold mb-6">Analysis Results</h3>
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderMetricCard(
                <Globe className="h-5 w-5 text-blue-500" />,
                "Pages Analyzed",
                crawlResult.completed || 0
              )}
              {renderMetricCard(
                <Search className="h-5 w-5 text-green-500" />,
                "Pages Found",
                crawlResult.total || 0
              )}
              {renderMetricCard(
                <AlertCircle className="h-5 w-5 text-red-500" />,
                "Issues Found",
                crawlResult.data?.length || 0,
                (crawlResult.data?.length || 0) > 0
              )}
            </div>

            {crawlResult.data && crawlResult.data.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Detailed Analysis</h4>
                <div className="overflow-auto max-h-96 rounded-lg border border-gray-200 dark:border-gray-800">
                  <pre className="p-4 text-sm bg-gray-50 dark:bg-gray-900">
                    {JSON.stringify(crawlResult.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p>Analysis completed at: {new Date(crawlResult.expiresAt || '').toLocaleString()}</p>
              <p>Credits used: {crawlResult.creditsUsed}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
