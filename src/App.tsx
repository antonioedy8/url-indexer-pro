
import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Reports from "@/pages/Reports";
import Sites from "@/pages/Sites";
import Keywords from "@/pages/Keywords";
import NotFound from "@/pages/NotFound";
import Seo from "@/pages/Seo";
import Settings from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import { MainNavigation } from "@/components/MainNavigation";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/keywords" element={<Keywords />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
