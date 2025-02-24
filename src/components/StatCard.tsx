
import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const StatCard = ({ icon, title, value }: StatCardProps) => (
  <Card className="p-6 flex flex-col glass-panel transition-all hover:scale-[1.02] cursor-pointer">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h3 className="font-medium text-sm">{title}</h3>
    </div>
    <p className="text-2xl font-semibold">{value}</p>
  </Card>
);
