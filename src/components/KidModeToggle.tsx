import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ShieldOff, Clock, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface KidModeToggleProps {
  isActive: boolean;
  onToggle: () => void;
  timeRemaining?: number;
}

export const KidModeToggle = ({ isActive, onToggle, timeRemaining }: KidModeToggleProps) => {
  const { t } = useTranslation();
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={cn(
      "transition-all duration-500 border-2",
      isActive 
        ? "bg-destructive/5 border-kidMode-active animate-kid-mode-active" 
        : "bg-success/5 border-kidMode-inactive shadow-card"
    )}>
      <CardHeader className="text-center pb-3 sm:pb-4">
        <div className={cn(
          "mx-auto mb-3 sm:mb-4 p-3 sm:p-4 rounded-full w-fit transition-all duration-300",
          isActive ? "bg-kidMode-active/10" : "bg-kidMode-inactive/10"
        )}>
          {isActive ? (
            <ShieldOff className="h-10 w-10 sm:h-12 sm:w-12 text-kidMode-active" />
          ) : (
            <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-kidMode-inactive" />
          )}
        </div>
        <CardTitle className={cn(
          "text-2xl sm:text-3xl font-bold",
          isActive ? "text-kidMode-active" : "text-kidMode-inactive"
        )}>
          {t("kidMode.title")}
        </CardTitle>
        <CardDescription className="text-base sm:text-lg px-2">
          {isActive ? t("kidMode.activeDescription") : t("kidMode.inactiveDescription")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <div className={cn(
            "flex items-center space-x-2 p-2 sm:p-3 rounded-lg",
            isActive ? "bg-kidMode-active/10" : "bg-kidMode-inactive/10"
          )}>
            {isActive ? (
              <WifiOff className="h-5 w-5 sm:h-6 sm:w-6 text-kidMode-active" />
            ) : (
              <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-kidMode-inactive" />
            )}
            <span className={cn(
              "font-medium text-sm sm:text-base",
              isActive ? "text-kidMode-active" : "text-kidMode-inactive"
            )}>
              {isActive ? t("kidMode.blocked") : t("kidMode.active")}
            </span>
          </div>
        </div>

        {isActive && timeRemaining && timeRemaining > 0 && (
          <div className="text-center p-3 sm:p-4 bg-kidMode-active/5 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-kidMode-active" />
              <span className="text-xs sm:text-sm font-medium text-kidMode-active">{t("kidMode.timeRemaining")}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-kidMode-active">
              {formatTime(timeRemaining)}
            </div>
          </div>
        )}

        <Button
          onClick={onToggle}
          className={cn(
            "w-full h-12 sm:h-14 text-base sm:text-lg font-semibold transition-all duration-300",
            isActive
              ? "bg-kidMode-inactive hover:bg-kidMode-inactive/90 text-white"
              : "bg-kidMode-active hover:bg-kidMode-active/90 text-white"
          )}
        >
          {isActive ? (
            <>
              <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {t("kidMode.deactivate")}
            </>
          ) : (
            <>
              <ShieldOff className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {t("kidMode.activate")}
            </>
          )}
        </Button>

        <div className="text-center px-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {isActive 
              ? t("kidMode.restrictedMessage")
              : t("kidMode.allowedMessage")
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};