
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CrawlForm } from "@/components/CrawlForm";
import {
  ChevronRight,
  Globe,
  Key,
  BarChart3,
  Settings,
  Map,
  Search,
  Microsoft,
} from "lucide-react";

const Index = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [sitemap, setSitemap] = useState("");
  const [googleKey, setGoogleKey] = useState("");
  const [bingKey, setBingKey] = useState("");

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-background to-secondary">
      <header className="fade-enter">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">URL Indexer Pro</h1>
            <p className="text-muted-foreground mt-2">
              Effortlessly manage and index your URLs
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            Connect API <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="space-y-8">
        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 fade-enter" style={{ animationDelay: "0.1s" }}>
          <StatCard
            icon={<Globe className="h-5 w-5 text-accent" />}
            title="Total URLs"
            value="0"
          />
          <StatCard
            icon={<Key className="h-5 w-5 text-accent" />}
            title="Active APIs"
            value="0"
          />
          <StatCard
            icon={<BarChart3 className="h-5 w-5 text-accent" />}
            title="Success Rate"
            value="0%"
          />
          <StatCard
            icon={<Settings className="h-5 w-5 text-accent" />}
            title="API Quota"
            value="200/day"
          />
        </section>

        {/* Configuration Tabs */}
        <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <Tabs defaultValue="sitemap" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="sitemap" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Sitemap
              </TabsTrigger>
              <TabsTrigger value="google" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Google API
              </TabsTrigger>
              <TabsTrigger value="bing" className="flex items-center gap-2">
                <Microsoft className="h-4 w-4" />
                Bing API
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sitemap">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Register Sitemap URL</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Sitemap URL
                    </label>
                    <Input
                      placeholder="https://example.com/sitemap.xml"
                      value={sitemap}
                      onChange={(e) => setSitemap(e.target.value)}
                    />
                  </div>
                  <Button className="w-full">Register Sitemap</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="google">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Google Search Console API</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      API Key
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter your Google API key"
                      value={googleKey}
                      onChange={(e) => setGoogleKey(e.target.value)}
                    />
                  </div>
                  <Button className="w-full">Save Google API Key</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="bing">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Bing Webmaster API</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      API Key
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter your Bing API key"
                      value={bingKey}
                      onChange={(e) => setBingKey(e.target.value)}
                    />
                  </div>
                  <Button className="w-full">Save Bing API Key</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* URL Analysis */}
        <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-xl font-semibold mb-4">Content Analysis</h2>
          <CrawlForm />
        </section>

        {/* URL Submission */}
        <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-semibold mb-4">Submit URLs</h2>
          <div className="flex gap-4">
            <Input
              placeholder="Enter URL or paste multiple URLs"
              className="flex-1"
              onChange={(e) => {
                const newUrls = e.target.value
                  .split("\n")
                  .map((url) => url.trim())
                  .filter(Boolean);
                setUrls(newUrls);
              }}
            />
            <Button className="bg-accent hover:bg-accent-hover text-white">
              Submit for Indexing
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Enter one URL per line or paste multiple URLs
          </p>
        </section>

        {/* Recent Activity */}
        <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="text-center text-muted-foreground py-8">
            No recent indexing activity
          </div>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <Card className="p-6 flex flex-col glass-panel transition-all hover:scale-[1.02] cursor-pointer">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h3 className="font-medium text-sm">{title}</h3>
    </div>
    <p className="text-2xl font-semibold">{value}</p>
  </Card>
);

export default Index;
