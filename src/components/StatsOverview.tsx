
import { Globe, Key, BarChart3, Settings } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsOverviewProps {
  totalUrls: number;
  activeApis: number;
  successRate: number;
  remainingQuota: number;
}

export const StatsOverview = ({ totalUrls, activeApis, successRate, remainingQuota }: StatsOverviewProps) => (
  <section className="grid grid-cols-1 md:grid-cols-4 gap-6 fade-enter" style={{ animationDelay: "0.1s" }}>
    <StatCard
      icon={<Globe className="h-5 w-5 text-blue-500" />}
      title="Total de URLs"
      value={totalUrls.toString()}
    />
    <StatCard
      icon={<Key className="h-5 w-5 text-green-500" />}
      title="APIs Ativas"
      value={activeApis.toString()}
    />
    <StatCard
      icon={<BarChart3 className="h-5 w-5 text-yellow-500" />}
      title="Taxa de Sucesso"
      value={`${successRate}%`}
    />
    <StatCard
      icon={<Settings className="h-5 w-5 text-purple-500" />}
      title="Quota Restante"
      value={`${remainingQuota}/dia`}
    />
  </section>
);
