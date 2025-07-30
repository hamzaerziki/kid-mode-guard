import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { KidModeToggle } from "@/components/KidModeToggle";
import { PasswordPrompt } from "@/components/PasswordPrompt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Clock, Shield, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  password: string;
}

export const Dashboard = ({ password }: DashboardProps) => {
  const [kidModeActive, setKidModeActive] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            toast({
              title: "Timer expired",
              description: "Timer has finished",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining, toast]);

  const handleToggleRequest = () => {
    setPendingAction(kidModeActive ? "disable Kid Mode" : "enable Kid Mode");
    setShowPasswordPrompt(true);
  };

  const handlePasswordVerified = () => {
    if (pendingAction.includes("enable")) {
      setKidModeActive(true);
      toast({
        title: "Kid Mode Activated",
        description: "Internet access has been restricted",
      });
    } else {
      setKidModeActive(false);
      setTimerActive(false);
      setTimeRemaining(0);
      toast({
        title: "Kid Mode Deactivated",
        description: "Internet access has been restored",
      });
    }
    setShowPasswordPrompt(false);
    setPendingAction("");
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setPendingAction("");
  };

  const startQuickTimer = (minutes: number) => {
    setPendingAction("enable Kid Mode with timer");
    setShowPasswordPrompt(true);
    
    // Store the timer value for after password verification
    setTimeout(() => {
      if (!showPasswordPrompt) {
        setTimeRemaining(minutes * 60);
        setTimerActive(true);
      }
    }, 100);
  };

  const getStatusCards = () => [
    {
      title: "Current Status",
      description: kidModeActive ? "Restricted" : "Active",
      icon: kidModeActive ? Shield : Smartphone,
      value: kidModeActive ? "Kid Mode ON" : "Kid Mode OFF",
      color: kidModeActive ? "text-kidMode-active" : "text-kidMode-inactive",
      bgColor: kidModeActive ? "bg-kidMode-active/5" : "bg-kidMode-inactive/5"
    },
    {
      title: "Session Time",
      description: "Today's usage",
      icon: Clock,
      value: timerActive ? `${Math.floor(timeRemaining / 60)}m ${timeRemaining % 60}s` : "No timer",
      color: "text-primary",
      bgColor: "bg-primary/5"
    },
    {
      title: "Quick Actions",
      description: "Fast controls",
      icon: Activity,
      value: "Ready",
      color: "text-secondary",
      bgColor: "bg-secondary/5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-1 gap-4">
          {getStatusCards().map((card, index) => (
            <Card key={index} className={`${card.bgColor} border-0`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {card.title}
                    </CardDescription>
                    <div className={`text-lg font-semibold ${card.color}`}>
                      {card.value}
                    </div>
                  </div>
                  <card.icon className={`h-8 w-8 ${card.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Toggle */}
        <KidModeToggle
          isActive={kidModeActive}
          onToggle={handleToggleRequest}
          timeRemaining={timeRemaining}
        />

        {/* Quick Timer Actions */}
        <Card className="bg-gradient-card border-primary/10 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-parentControl">
              Quick Timers
            </CardTitle>
            <CardDescription>
              Activate Kid Mode for a set time period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "15 min", value: 15 },
                { label: "30 min", value: 30 },
                { label: "1 hour", value: 60 },
                { label: "2 hours", value: 120 }
              ].map((timer) => (
                <Button
                  key={timer.value}
                  variant="outline"
                  onClick={() => startQuickTimer(timer.value)}
                  disabled={kidModeActive}
                  className="hover:border-primary/50 hover:bg-primary/5"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {timer.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="bg-gradient-secondary/5 border-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Shield className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-parentControl mb-1">Parenting Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Set consistent internet time limits and communicate expectations clearly with your child.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showPasswordPrompt && (
        <PasswordPrompt
          onPasswordVerified={handlePasswordVerified}
          onCancel={handlePasswordCancel}
          correctPassword={password}
          action={pendingAction}
        />
      )}
    </div>
  );
};