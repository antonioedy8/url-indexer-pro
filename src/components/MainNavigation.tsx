
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Layout, Search, Settings, BarChart2 } from "lucide-react";

export const MainNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-4">
      <Link to="/">
        <Button
          variant={isActive('/') ? 'default' : 'ghost'}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </Button>
      </Link>
      <Link to="/sites">
        <Button
          variant={isActive('/sites') ? 'default' : 'ghost'}
          className="flex items-center gap-2"
        >
          <Layout className="h-4 w-4" />
          <span>Sites</span>
        </Button>
      </Link>
      <Link to="/seo">
        <Button
          variant={isActive('/seo') ? 'default' : 'ghost'}
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          <span>SEO</span>
        </Button>
      </Link>
      <Link to="/settings">
        <Button
          variant={isActive('/settings') ? 'default' : 'ghost'}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          <span>Configurações</span>
        </Button>
      </Link>
      <Link to="/analytics">
        <Button
          variant={isActive('/analytics') ? 'default' : 'ghost'}
          className="flex items-center gap-2"
        >
          <BarChart2 className="h-4 w-4" />
          <span>Analytics</span>
        </Button>
      </Link>
    </nav>
  );
};
