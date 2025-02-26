
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DateRange } from "react-day-picker";

const Reports = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });

  const mockData = [
    { date: '2024-01', indexadas: 120, pendentes: 30, falhas: 5 },
    { date: '2024-02', indexadas: 150, pendentes: 25, falhas: 3 },
    { date: '2024-03', indexadas: 180, pendentes: 20, falhas: 2 },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <div className="flex items-center gap-4">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Status de Indexação</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="indexadas" stroke="#3b82f6" />
              <Line type="monotone" dataKey="pendentes" stroke="#f59e0b" />
              <Line type="monotone" dataKey="falhas" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Métricas de Desempenho</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
              <span>Tempo Médio de Indexação</span>
              <span className="font-semibold">2.5 dias</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
              <span>Taxa de Sucesso</span>
              <span className="font-semibold text-green-500">85%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
              <span>URLs Processadas</span>
              <span className="font-semibold">1,234</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
