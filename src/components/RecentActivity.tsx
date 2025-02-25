
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LogEntry {
  timestamp: string;
  type: 'error' | 'success';
  message: string;
  details?: string;
}

interface DailyMetric {
  date: string;
  urlsSubmitted: number;
  successRate: number;
  errorRate: number;
}

const mockDailyMetrics: DailyMetric[] = Array.from({ length: 7 }).map((_, i) => ({
  date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  urlsSubmitted: Math.floor(Math.random() * 100),
  successRate: Math.floor(Math.random() * 100),
  errorRate: Math.floor(Math.random() * 30),
}));

const mockLogs: LogEntry[] = [
  {
    timestamp: new Date().toISOString(),
    type: 'error',
    message: 'Falha na indexação',
    details: 'URL não acessível: https://example.com/page1'
  },
  {
    timestamp: new Date(Date.now() - 1000 * 60).toISOString(),
    type: 'success',
    message: 'URL indexada com sucesso',
    details: 'https://example.com/page2'
  },
  // ... Adicione mais logs mock aqui
];

export const RecentActivity = () => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'logs'>('metrics');

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Atividade Recente</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded ${activeTab === 'metrics' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Métricas
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded ${activeTab === 'logs' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Logs
          </button>
        </div>
      </div>

      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockDailyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="urlsSubmitted" stroke="#3b82f6" name="URLs Enviadas" />
                <Line type="monotone" dataKey="successRate" stroke="#22c55e" name="Taxa de Sucesso" />
                <Line type="monotone" dataKey="errorRate" stroke="#ef4444" name="Taxa de Erro" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {mockLogs.map((log, index) => (
              <Alert key={index} variant={log.type === 'error' ? 'destructive' : 'default'}>
                <div className="flex items-center gap-2">
                  {log.type === 'error' ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  <AlertTitle>
                    {new Date(log.timestamp).toLocaleString()}
                  </AlertTitle>
                </div>
                <AlertDescription className="mt-2">
                  <p className="font-medium">{log.message}</p>
                  {log.details && (
                    <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                  )}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  );
};
