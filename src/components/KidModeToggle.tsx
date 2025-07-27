import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ShieldOff, Clock, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface KidModeToggleProps {
  isActive: boolean;
  onToggle: () => void;
  timeRemaining?: number;
}

export const KidModeToggle = ({ isActive, onToggle, timeRemaining }: KidModeToggleProps) => {
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
        ? "bg-red-50 border-kidMode-active animate-kid-mode-active" 
        : "bg-green-50 border-kidMode-inactive shadow-card"
    )}>
      <CardHeader className="text-center pb-4">
        <div className={cn(
          "mx-auto mb-4 p-4 rounded-full w-fit transition-all duration-300",
          isActive ? "bg-kidMode-active/10" : "bg-kidMode-inactive/10"
        )}>
          {isActive ? (
            <ShieldOff className="h-12 w-12 text-kidMode-active" />
          ) : (
            <Shield className="h-12 w-12 text-kidMode-inactive" />
          )}
        </div>
        <CardTitle className={cn(
          "text-3xl font-bold",
          isActive ? "text-kidMode-active" : "text-kidMode-inactive"
        )}>
          Kid Mode
        </CardTitle>
        <CardDescription className="text-lg">
          {isActive ? "Internet access is restricted" : "Internet access is allowed"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <div className={cn(
            "flex items-center space-x-2 p-3 rounded-lg",
            isActive ? "bg-kidMode-active/10" : "bg-kidMode-inactive/10"
          )}>
            {isActive ? (
              <WifiOff className="h-6 w-6 text-kidMode-active" />
            ) : (
              <Wifi className="h-6 w-6 text-kidMode-inactive" />
            )}
            <span className={cn(
              "font-medium",
              isActive ? "text-kidMode-active" : "text-kidMode-inactive"
            )}>
              {isActive ? "Blocked" : "Active"}
            </span>
          </div>
        </div>

        {isActive && timeRemaining && timeRemaining > 0 && (
          <div className="text-center p-4 bg-kidMode-active/5 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-kidMode-active" />
              <span className="text-sm font-medium text-kidMode-active">Time Remaining</span>
            </div>
            <div className="text-2xl font-bold text-kidMode-active">
              {formatTime(timeRemaining)}
            </div>
          </div>
        )}

        <Button
          onClick={onToggle}
          className={cn(
            "w-full h-14 text-lg font-semibold transition-all duration-300",
            isActive
              ? "bg-kidMode-inactive hover:bg-kidMode-inactive/90 text-white"
              : "bg-kidMode-active hover:bg-kidMode-active/90 text-white"
          )}
        >
          {isActive ? (
            <>
              <Shield className="mr-2 h-5 w-5" />
              Deactivate Kid Mode
            </>
          ) : (
            <>
              <ShieldOff className="mr-2 h-5 w-5" />
              Activate Kid Mode
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isActive 
              ? "Your child's internet access is now restricted" 
              : "Your child has full internet access"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};