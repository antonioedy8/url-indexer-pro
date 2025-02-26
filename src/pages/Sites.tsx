
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2 } from "lucide-react";

interface Site {
  id: string;
  name: string;
  url: string;
  sitemap: string;
}

export const Sites = () => {
  const { toast } = useToast();
  const [sites, setSites] = useState<Site[]>([]);
  const [newSite, setNewSite] = useState({ name: "", url: "", sitemap: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSite.name || !newSite.url || !newSite.sitemap) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setSites([...sites, { ...newSite, id: Date.now().toString() }]);
    setNewSite({ name: "", url: "", sitemap: "" });
    toast({
      title: "Sucesso",
      description: "Site cadastrado com sucesso",
    });
  };

  const deleteSite = (id: string) => {
    setSites(sites.filter(site => site.id !== id));
    toast({
      title: "Sucesso",
      description: "Site removido com sucesso",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gerenciar Sites</h1>
      
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Site</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome do Site</label>
              <Input
                value={newSite.name}
                onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                placeholder="Meu Site"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <Input
                value={newSite.url}
                onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
                placeholder="https://meusite.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sitemap</label>
              <Input
                value={newSite.sitemap}
                onChange={(e) => setNewSite({ ...newSite, sitemap: e.target.value })}
                placeholder="https://meusite.com/sitemap.xml"
              />
            </div>
          </div>
          <Button type="submit" className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Site
          </Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{site.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteSite(site.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">URL: {site.url}</p>
              <p className="text-muted-foreground">Sitemap: {site.sitemap}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sites;
