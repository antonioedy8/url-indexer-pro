
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const IndexHeader = () => (
  <header className="fade-enter">
    <div className="flex items-center justify-between mb-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">URL Indexer Pro</h1>
        <p className="text-muted-foreground mt-2">
          Automatize a indexação de URLs no Google e Bing
        </p>
      </div>
      <Button variant="outline" className="gap-2">
        API Status <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  </header>
);
