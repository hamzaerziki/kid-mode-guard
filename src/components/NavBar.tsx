import { Button } from "@/components/ui/button";
import { Shield, Settings, Home, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const NavBar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: "/", label: t("navbar.dashboard"), icon: Home },
    { path: "/timer", label: t("navbar.timer"), icon: Clock },
    { path: "/settings", label: t("navbar.settings"), icon: Settings },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-40 backdrop-blur-sm pt-safe-top">
      <div className="max-w-md mx-auto px-4 pt-2">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <span className="text-base sm:text-lg font-bold text-parentControl">{t("navbar.title")}</span>
          </div>
        </div>
        
        <div className="flex justify-around pb-2 px-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path} className="flex-1">
              <Button
                variant="ghost"
                className={cn(
                  "flex flex-col items-center space-y-1 h-auto py-2 px-2 sm:px-3 rounded-lg transition-all duration-200 w-full",
                  location.pathname === path
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium truncate">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};