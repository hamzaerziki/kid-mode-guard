import { Button } from "@/components/ui/button";
import { Shield, Settings, Home, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/timer", label: "Timer", icon: Clock },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="bg-gradient-card border-b border-primary/10 shadow-card sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-lg font-bold text-parentControl">Parental Panel</span>
          </div>
        </div>
        
        <div className="flex justify-around pb-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}>
              <Button
                variant="ghost"
                className={cn(
                  "flex flex-col items-center space-y-1 h-auto py-2 px-3 rounded-lg transition-all duration-200",
                  location.pathname === path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};