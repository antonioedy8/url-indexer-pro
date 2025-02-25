
import { Card } from "@/components/ui/card";
import { Globe, TrendingUp, BarChart3, Settings } from "lucide-react";
import { StatCard } from "@/components/StatCard";

interface ExternalMetricsProps {
  metrics: {
    domainAuthority: number;
    backlinks: number;
    lighthouse: {
      performance: number;
      seo: number;
    };
  };
}

export const ExternalMetrics = ({ metrics }: ExternalMetricsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Métricas Externas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          icon={<Globe className="h-5 w-5 text-blue-500" />}
          title="Autoridade do Domínio"
          value={`${metrics.domainAuthority}/100`}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          title="Backlinks"
          value={metrics.backlinks.toString()}
        />
        <StatCard
          icon={<BarChart3 className="h-5 w-5 text-yellow-500" />}
          title="Performance"
          value={`${metrics.lighthouse.performance}%`}
        />
        <StatCard
          icon={<Settings className="h-5 w-5 text-purple-500" />}
          title="SEO Score"
          value={`${metrics.lighthouse.seo}%`}
        />
      </div>
    </Card>
  );
};
