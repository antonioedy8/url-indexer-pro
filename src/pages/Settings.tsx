
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings2, 
  Key, 
  Bell, 
  Shield, 
  Database, 
  Moon, 
  Sun, 
  Globe, 
  Save, 
  Sparkles, 
  Languages
} from "lucide-react";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [language, setLanguage] = useState("en");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reportFrequency, setReportFrequency] = useState("weekly");

  const handleSaveSettings = () => {
    toast({
      title: "Success",
      description: "Settings saved successfully",
    });
  };

  const handleSaveGoogleSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleAnalyticsId || !propertyId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here you save the Google settings
    toast({
      title: "Success",
      description: "Google settings saved successfully",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your application preferences and integrations
        </p>
      </div>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="bg-card w-full justify-start overflow-auto">
          <TabsTrigger value="geral" className="flex items-center gap-2 px-4">
            <Settings2 className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 px-4">
            <Moon className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2 px-4">
            <Languages className="w-4 h-4" />
            Language
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2 px-4">
            <Key className="w-4 h-4" />
            API
          </TabsTrigger>
          <TabsTrigger value="google" className="flex items-center gap-2 px-4">
            <Database className="w-4 h-4" />
            Google Integrations
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2 px-4">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2 px-4">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card className="p-6 space-y-6">
            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <Separator className="mb-4" />
              </div>
              
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Account Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Account Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Your account is active
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                    Active
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Appearance</h3>
              <Separator className="mb-4" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark theme for the interface
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <Button 
              onClick={handleSaveSettings}
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Language</h3>
              <Separator className="mb-4" />
            </div>
            
            <LanguageSwitcher 
              language={language}
              onChange={setLanguage}
            />
            
            <Button 
              onClick={handleSaveSettings}
              className="w-full sm:w-auto flex items-center gap-2 mt-4"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">API Settings</h3>
              <Separator className="mb-4" />
            </div>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const newKey = Math.random().toString(36).substring(2, 15);
                      setApiKey(newKey);
                      toast({
                        title: "New API Key Generated",
                        description: "Keep this key secure!"
                      });
                    }}
                  >
                    Generate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your API key is used to authenticate requests to our API
                </p>
              </div>

              <div className="p-4 bg-secondary rounded-lg border border-border mt-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  API Usage Limits
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Daily Requests</span>
                    <span className="font-medium">1,000 / 10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Requests</span>
                    <span className="font-medium">25,000 / 300,000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleSaveSettings}
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save API Settings
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="google">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Google Integrations</h3>
              <Separator className="mb-4" />
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect your Google account to access data from Search Console and Analytics
              </p>
              
              <div className="space-y-4">
                <GoogleAuthButton />
                
                <div className="pt-4">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    className="mt-2"
                    placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                    value={googleAnalyticsId}
                    onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Find your ID in your Google Analytics Admin area
                  </p>
                </div>

                <div className="pt-2">
                  <Label htmlFor="propertyId">Search Console Property ID</Label>
                  <Input
                    id="propertyId"
                    className="mt-2"
                    placeholder="Enter your Search Console property ID"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    The URL of your verified property in Search Console
                  </p>
                </div>

                <Button 
                  onClick={handleSaveGoogleSettings} 
                  className="w-full flex items-center gap-2 mt-2"
                >
                  <Save className="w-4 h-4" />
                  Save Google Settings
                </Button>
              </div>

              <div className="mt-4 p-4 bg-secondary rounded-lg border border-border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  Data Collection
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">• Search ranking positions</li>
                  <li className="flex items-center gap-2">• Impressions and clicks</li>
                  <li className="flex items-center gap-2">• Top keywords</li>
                  <li className="flex items-center gap-2">• Traffic analysis</li>
                  <li className="flex items-center gap-2">• User behavior</li>
                  <li className="flex items-center gap-2">• Demographics</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
              <Separator className="mb-4" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="pt-4">
                <Label htmlFor="reportFrequency">Report Frequency</Label>
                <select 
                  id="reportFrequency"
                  value={reportFrequency}
                  onChange={(e) => setReportFrequency(e.target.value)}
                  className="w-full mt-2 p-2 rounded-md border border-input bg-background"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  How often you want to receive SEO reports
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleSaveSettings}
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Notification Settings
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Security Settings</h3>
              <Separator className="mb-4" />
            </div>
            
            <div className="grid gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Password</h4>
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  Change Password
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Configure 2FA</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium text-red-500">Danger Zone</h4>
                <p className="text-sm text-muted-foreground">
                  Permanent actions that cannot be undone
                </p>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
