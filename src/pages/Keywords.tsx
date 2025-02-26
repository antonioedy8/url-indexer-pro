
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Download, Filter } from "lucide-react";

interface Keyword {
  keyword: string;
  volume: number;
  difficulty: number;
  traffic: number;
  position: number;
}

const Keywords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const mockKeywords: Keyword[] = [
    { keyword: "seo otimização", volume: 1200, difficulty: 45, traffic: 580, position: 3 },
    { keyword: "indexação google", volume: 800, difficulty: 35, traffic: 420, position: 2 },
    { keyword: "meta tags seo", volume: 600, difficulty: 25, traffic: 300, position: 4 },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Palavras-chave</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Pesquisar palavras-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="high-volume">Alto Volume</SelectItem>
            <SelectItem value="low-difficulty">Baixa Dificuldade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Desempenho das Palavras-chave</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Palavra-chave</th>
                  <th className="text-left p-3">Volume</th>
                  <th className="text-left p-3">Dificuldade</th>
                  <th className="text-left p-3">Tráfego</th>
                  <th className="text-left p-3">Posição</th>
                </tr>
              </thead>
              <tbody>
                {mockKeywords.map((kw, index) => (
                  <tr key={index} className="border-b hover:bg-secondary/50">
                    <td className="p-3">{kw.keyword}</td>
                    <td className="p-3">{kw.volume}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${kw.difficulty}%` }}
                          />
                        </div>
                        <span>{kw.difficulty}%</span>
                      </div>
                    </td>
                    <td className="p-3">{kw.traffic}</td>
                    <td className="p-3">{kw.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Keywords;
