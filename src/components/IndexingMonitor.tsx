
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RefreshCw, TrendingUp } from "lucide-react";
import { IndexMonitoringService } from '@/utils/IndexMonitoringService';

interface MonitoringProps {
  url: string;
}

export const IndexingMonitor = ({ url }: MonitoringProps) => {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trafficData, setTrafficData] = useState<any>(null);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const result = await IndexMonitoringService.monitorUrl(url);
      setStatus(result);
      
      if (result.isIndexed) {
        const traffic = await IndexMonitoringService.getTrafficImpact(url);
        setTrafficData(traffic);
      }
    } catch (error) {
      console.error('Error checking indexation status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      checkStatus();
    }
  }, [url]);

  if (!url) return null;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Monitoramento de Indexação</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={checkStatus}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            {status?.isIndexed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <div>
              <h4 className="font-medium">Status de Indexação</h4>
              <p className="text-sm text-muted-foreground">
                {status?.isIndexed ? 'URL Indexada' : 'Aguardando Indexação'}
              </p>
            </div>
          </div>
          {!status?.isIndexed && (
            <div className="mt-4">
              <Progress value={(status?.attempts / 3) * 100} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Tentativa {status?.attempts || 0} de 3
              </p>
            </div>
          )}
        </Card>

        {trafficData && (
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-medium">Impacto no Tráfego</h4>
                <p className="text-sm text-muted-foreground">
                  {trafficData.change > 0 ? 'Aumento' : 'Redução'} de{' '}
                  {Math.abs(trafficData.change)}% no tráfego
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Antes</p>
                <p className="font-medium">{trafficData.beforeIndexing} visitas</p>
              </div>
              <div>
                <p className="text-muted-foreground">Depois</p>
                <p className="font-medium">{trafficData.afterIndexing} visitas</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Última verificação: {status?.lastChecked ? new Date(status.lastChecked).toLocaleString() : 'Nunca'}
      </div>
    </Card>
  );
};
