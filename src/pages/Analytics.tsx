
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Users, Globe, ArrowUpRight } from "lucide-react";

const Analytics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [period, setPeriod] = useState("7d");

  const trafficData = [
    { date: "2024-01", organicVisits: 1200, directVisits: 800 },
    { date: "2024-02", organicVisits: 1400, directVisits: 900 },
    { date: "2024-03", organicVisits: 1800, directVisits: 1100 },
  ];

  const conversionData = [
    { page: "Homepage", views: 5000, conversions: 150 },
    { page: "Blog", views: 3000, conversions: 90 },
    { page: "Produtos", views: 2000, conversions: 60 },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex items-center gap-4">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Visitas Totais
              </p>
              <h3 className="text-2xl font-bold">24,892</h3>
              <p className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                12.5%
              </p>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Taxa de Conversão
              </p>
              <h3 className="text-2xl font-bold">3.2%</h3>
              <p className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                2.1%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Páginas por Sessão
              </p>
              <h3 className="text-2xl font-bold">2.8</h3>
              <p className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                0.3%
              </p>
            </div>
            <Globe className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tráfego ao Longo do Tempo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="organicVisits" stroke="#3b82f6" name="Orgânico" />
              <Line type="monotone" dataKey="directVisits" stroke="#10b981" name="Direto" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversões por Página</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#3b82f6" name="Visualizações" />
              <Bar dataKey="conversions" fill="#10b981" name="Conversões" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
